import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Select from "react-select";

export default function AddProduct() {
  const router = useRouter();
  const [productForm, setProductForm] = useState({
    name: "",
    specification: "",
    configurations: "",
    categoryId: "",
    highlights: [{ title: "", description: "" }],
    // These will be filled only after a successful upload
    img: [],
    datasheet: "",
    brochure: "",
  });
  const [message, setMessage] = useState("");
  const [categories, setCategories] = useState([]);
  const [uploading, setUploading] = useState(false);

  // **New states for local file objects (not URLs yet)**
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedDatasheet, setSelectedDatasheet] = useState(null);
  const [selectedBrochure, setSelectedBrochure] = useState(null);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductForm((prev) => ({ ...prev, [name]: value }));
  };

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

  // **New file selection handlers (do not upload yet)**
  const handleImageSelection = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages(files);
  };

  const handleDatasheetSelection = (e) => {
    setSelectedDatasheet(e.target.files[0]);
  };

  const handleBrochureSelection = (e) => {
    setSelectedBrochure(e.target.files[0]);
  };

  // **Deferred upload function – called on submission**
  const uploadFiles = async () => {
    const uploadedImageUrls = [];
    try {
      setUploading(true);

      // Upload each image sequentially (or you can use Promise.all for parallel uploads)
      for (const file of selectedImages) {
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        if (!res.ok) throw new Error("Image upload failed");
        const { fileUrl } = await res.json();
        uploadedImageUrls.push(fileUrl);
      }

      let datasheetUrl = "";
      if (selectedDatasheet) {
        const formData = new FormData();
        formData.append("file", selectedDatasheet);
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        if (!res.ok) throw new Error("Datasheet upload failed");
        const data = await res.json();
        datasheetUrl = data.fileUrl;
      }

      let brochureUrl = "";
      if (selectedBrochure) {
        const formData = new FormData();
        formData.append("file", selectedBrochure);
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        if (!res.ok) throw new Error("Brochure upload failed");
        const data = await res.json();
        brochureUrl = data.fileUrl;
      }

      return { uploadedImageUrls, datasheetUrl, brochureUrl };
    } catch (error) {
      console.error("Error during file uploads:", error);
      throw error;
    } finally {
      setUploading(false);
    }
  };

  // **Cancel function – deletes already uploaded files (if any) and resets state**
  const handleCancelUploadedFiles = async (fileUrls) => {
    const { uploadedImageUrls, datasheetUrl, brochureUrl } = fileUrls;
    const deletePromises = [];
    for (const url of uploadedImageUrls) {
      deletePromises.push(
        fetch("/api/delete-file", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fileUrl: url }),
        })
      );
    }
    if (datasheetUrl) {
      deletePromises.push(
        fetch("/api/delete-file", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fileUrl: datasheetUrl }),
        })
      );
    }
    if (brochureUrl) {
      deletePromises.push(
        fetch("/api/delete-file", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fileUrl: brochureUrl }),
        })
      );
    }
    await Promise.all(deletePromises);
  };

  // **Cancel button handler – invoked if the user decides to cancel product creation**
  const handleCancel = async () => {
    // If any files were already uploaded (for example, from a previous failed attempt), delete them.
    if (productForm.img.length || productForm.datasheet || productForm.brochure) {
      await handleCancelUploadedFiles({
        uploadedImageUrls: productForm.img,
        datasheetUrl: productForm.datasheet,
        brochureUrl: productForm.brochure,
      });
    }
    // Reset all form and file states
    setProductForm({
      name: "",
      specification: "",
      configurations: "",
      categoryId: "",
      highlights: [{ title: "", description: "" }],
      img: [],
      datasheet: "",
      brochure: "",
    });
    setSelectedImages([]);
    setSelectedDatasheet(null);
    setSelectedBrochure(null);
    setMessage("Product creation cancelled");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate required fields
      if (!productForm.name || !productForm.categoryId) {
        setMessage("Name and Category are required");
        return;
      }

      // First upload the files
      const { uploadedImageUrls, datasheetUrl, brochureUrl } = await uploadFiles();

      // Prepare the product data including the file URLs
      const productData = {
        name: productForm.name,
        specification: productForm.specification,
        configurations: productForm.configurations,
        categoryId: productForm.categoryId,
        highlights: productForm.highlights,
        img: uploadedImageUrls,
        datasheet: datasheetUrl,
        brochure: brochureUrl,
      };

      const resProduct = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      if (!resProduct.ok) {
        // If product creation fails, clean up the uploaded files
        await handleCancelUploadedFiles({
          uploadedImageUrls,
          datasheetUrl,
          brochureUrl,
        });
        setMessage("Error creating product");
        return;
      }

      const newProduct = await resProduct.json();
      setMessage("Product created successfully!");

      // Reset state upon success
      setProductForm({
        name: "",
        specification: "",
        configurations: "",
        categoryId: "",
        highlights: [{ title: "", description: "" }],
        img: [],
        datasheet: "",
        brochure: "",
      });
      setSelectedImages([]);
      setSelectedDatasheet(null);
      setSelectedBrochure(null);
      // Optionally, navigate away or update your UI
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error creating product");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1 className="text-3xl font-bold mb-6">Add Product</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-2">
        <input
          type="text"
          name="name"
          value={productForm.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="border border-gray-300 rounded-md p-2 w-full"
        />

        <Select
          options={categories.map((cat) => ({
            value: cat.id,
            label: cat.name,
          }))}
          onChange={(selected) =>
            setProductForm((prev) => ({
              ...prev,
              categoryId: selected?.value || "",
            }))
          }
          placeholder="Category"
          isClearable
          className="w-full"
        />

        <textarea
          name="specification"
          value={productForm.specification}
          onChange={handleChange}
          placeholder="Specifications"
          className="border border-gray-300 rounded-md p-2 w-full col-span-2"
        />
        <textarea
          name="configurations"
          value={productForm.configurations}
          onChange={handleChange}
          placeholder="Configurations"
          className="border border-gray-300 rounded-md p-2 w-full col-span-2"
        />

        <div className="col-span-2">
          <h2 className="text-xl font-bold mb-2">Highlights</h2>
          {productForm.highlights.map((highlight, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={highlight.title}
                onChange={(e) =>
                  handleHighlightChange(index, "title", e.target.value)
                }
                placeholder="Title"
                className="border border-gray-300 rounded-md p-2 w-full"
              />
              <input
                type="text"
                value={highlight.description}
                onChange={(e) =>
                  handleHighlightChange(index, "description", e.target.value)
                }
                placeholder="Description"
                className="border border-gray-300 rounded-md p-2 w-full"
              />
              <button
                type="button"
                onClick={() => removeHighlight(index)}
                className="bg-red-500 text-white p-2 rounded-md"
              >
                X
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addHighlight}
            className="bg-green-500 text-white p-2 rounded-md mt-2"
          >
            + Add Highlight
          </button>
        </div>

        {/* File inputs now only save file objects locally */}
        <div className="col-span-2">
          <h2 className="text-xl font-bold mb-2">Product Images</h2>
          <input
            type="file"
            multiple
            onChange={handleImageSelection}
            className="border p-2 w-full"
          />
          {selectedImages.length > 0 &&
            selectedImages.map((file, index) => (
              <p key={index}>{file.name}</p>
            ))}
        </div>

        <div className="col-span-2">
          <h2 className="text-xl font-bold mb-2">Datasheet</h2>
          <input
            type="file"
            onChange={handleDatasheetSelection}
            className="border p-2 w-full"
          />
          {selectedDatasheet && <p>{selectedDatasheet.name}</p>}
        </div>

        <div className="col-span-2">
          <h2 className="text-xl font-bold mb-2">Brochure</h2>
          <input
            type="file"
            onChange={handleBrochureSelection}
            className="border p-2 w-full"
          />
          {selectedBrochure && <p>{selectedBrochure.name}</p>}
        </div>

        <div className="col-span-2 flex gap-2 mt-2">
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md flex-1"
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Add Product"}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-500 text-white p-2 rounded-md flex-1"
          >
            Cancel
          </button>
        </div>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}
