import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Select from "react-select";

export default function AddProduct() {
  const router = useRouter();
  const [productForm, setProductForm] = useState({
    name: "",
    img: [""], // Array of image URLs
    specification: "",
    configurations: "",
    categoryId: "",
    highlights: [{ title: "", description: "" }], // Dynamic highlights
    datasheet: "",
    brochure: "",
  });
  const [message, setMessage] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image URL input dynamically
  const handleImageChange = (index, value) => {
    const updatedImages = [...productForm.img];
    updatedImages[index] = value;
    setProductForm((prev) => ({ ...prev, img: updatedImages }));
  };

  const addImageField = () => {
    setProductForm((prev) => ({ ...prev, img: [...prev.img, ""] }));
  };

  const removeImageField = (index) => {
    const updatedImages = productForm.img.filter((_, i) => i !== index);
    setProductForm((prev) => ({ ...prev, img: updatedImages }));
  };

  // Handle highlight input dynamically
  const handleHighlightChange = (index, field, value) => {
    const updatedHighlights = [...productForm.highlights];
    updatedHighlights[index][field] = value;
    setProductForm((prev) => ({ ...prev, highlights: updatedHighlights }));
  };

  const addHighlight = () => {
    setProductForm((prev) => ({
      ...prev,
      highlights: [...prev.highlights, { title: "", description: "" }],
    }));
  };

  const removeHighlight = (index) => {
    const updatedHighlights = productForm.highlights.filter((_, i) => i !== index);
    setProductForm((prev) => ({ ...prev, highlights: updatedHighlights }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productForm),
      });

      if (!res.ok) throw new Error("Failed to create product");

      setMessage("Product created successfully!");
      setProductForm({
        name: "",
        img: [""],
        specification: "",
        configurations: "",
        categoryId: "",
        highlights: [{ title: "", description: "" }],
        datasheet: "",
        brochure: "",
      });
    } catch (error) {
      console.error(error);
      setMessage("Error creating product");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1 className="text-3xl font-bold mb-6">Add Product</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-2">
        <input type="text" name="name" value={productForm.name} onChange={handleChange} placeholder="Product Name" className="border border-gray-300 rounded-md p-2 w-full" />

        <Select options={categories.map((cat) => ({ value: cat.id, label: cat.name }))} onChange={(selected) => setProductForm((prev) => ({ ...prev, categoryId: selected?.value || "" }))} placeholder="Category" isClearable className="w-full" />
        <textarea name="specification" value={productForm.specification} onChange={handleChange} placeholder="Specifications" className="border border-gray-300 rounded-md p-2 w-full col-span-2" />
        <textarea name="configurations" value={productForm.configurations} onChange={handleChange} placeholder="Configurations" className="border border-gray-300 rounded-md p-2 w-full col-span-2" />

        {/* Dynamic Image URLs */}
        <div className="col-span-2">
          <h2 className="text-xl font-bold mb-2">Images (URLs)</h2>
          {productForm.img.map((image, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input type="text" value={image} onChange={(e) => handleImageChange(index, e.target.value)} placeholder="Image URL" className="border border-gray-300 rounded-md p-2 w-full" />
              {index > 0 && (
                <button type="button" onClick={() => removeImageField(index)} className="bg-red-500 text-white p-2 rounded-md">
                  X
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={addImageField} className="bg-green-500 text-white p-2 rounded-md mt-2">
            + Add Image URL
          </button>
        </div>

        {/* Dynamic Highlights */}
        <div className="col-span-2">
          <h2 className="text-xl font-bold mb-2">Highlights</h2>
          {productForm.highlights.map((highlight, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input type="text" value={highlight.title} onChange={(e) => handleHighlightChange(index, "title", e.target.value)} placeholder="Title" className="border border-gray-300 rounded-md p-2 w-full" />
              <input type="text" value={highlight.description} onChange={(e) => handleHighlightChange(index, "description", e.target.value)} placeholder="Description" className="border border-gray-300 rounded-md p-2 w-full" />
              <button type="button" onClick={() => removeHighlight(index)} className="bg-red-500 text-white p-2 rounded-md">X</button>
            </div>
          ))}
          <button type="button" onClick={addHighlight} className="bg-green-500 text-white p-2 rounded-md mt-2">+ Add Highlight</button>
        </div>
        <input type="text" name="datasheet" value={productForm.datasheet} onChange={handleChange} placeholder="Datasheet" className="border border-gray-300 rounded-md p-2 w-full" />

        <input type="text" name="brochure" value={productForm.brochure} onChange={handleChange} placeholder="Brochure" className="border border-gray-300 rounded-md p-2 w-full" />

        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md col-span-2 mt-2">Add Product</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
