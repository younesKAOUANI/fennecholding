import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Select from "react-select";

export default function EditProduct() {
  const router = useRouter();
  const { id } = router.query;

  const [productForm, setProductForm] = useState({
    name: "",
    specification: "",
    configurations: "",
    categoryId: "",
    highlights: [{ title: "", description: "" }],
    img: [], // current images as an array of URLs
    datasheet: "",
    brochure: "",
  });

  // Local file states (only if the user selects a new file)
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedDatasheet, setSelectedDatasheet] = useState(null);
  const [selectedBrochure, setSelectedBrochure] = useState(null);

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch product data
  useEffect(() => {
    if (!id) return;
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) throw new Error("Impossible de charger le produit");
        const data = await res.json();
        setProductForm(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  // Fetch categories
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Error de chargement des categories:", error);
      }
    }
    fetchCategories();
  }, []);

  // --- Form field handlers ---
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

  // --- File selection handlers ---
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

  // --- Deferred file upload during update ---
  const uploadFiles = async () => {
    const uploadedImageUrls = [];
    try {
      setUploading(true);

      // Upload any newly selected images
      for (const file of selectedImages) {
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        if (!res.ok) throw new Error("Impossible de téléverser l'image");
        const { fileUrl } = await res.json();
        uploadedImageUrls.push(fileUrl);
      }

      // If a new datasheet was selected, upload it; otherwise, keep the existing URL.
      let datasheetUrl = productForm.datasheet;
      if (selectedDatasheet) {
        const formData = new FormData();
        formData.append("file", selectedDatasheet);
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        if (!res.ok) throw new Error("Echec de la téléversement du fichier de la datasheet");
        const data = await res.json();
        datasheetUrl = data.fileUrl;
      }

      // Same for brochure.
      let brochureUrl = productForm.brochure;
      if (selectedBrochure) {
        const formData = new FormData();
        formData.append("file", selectedBrochure);
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        if (!res.ok) throw new Error("Impossible de téléverser la brochure");
        const data = await res.json();
        brochureUrl = data.fileUrl;
      }

      return { uploadedImageUrls, datasheetUrl, brochureUrl };
    } catch (error) {
      throw error;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Upload any new files and get their URLs.
      const { uploadedImageUrls, datasheetUrl, brochureUrl } = await uploadFiles();

      // For images: if any new images were uploaded, use those; otherwise keep the existing ones.
      const finalImages = uploadedImageUrls.length > 0 ? uploadedImageUrls : productForm.img;

      const updatedProductData = {
        ...productForm,
        img: finalImages,
        datasheet: datasheetUrl,
        brochure: brochureUrl,
      };

      // Send update request to the API.
      const resUpdate = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProductData),
      });
      if (!resUpdate.ok) throw new Error("échec de la mise à jour du produit");
      const updatedProduct = await resUpdate.json();
      setMessage("Produit mis à jour!");
      // Optionally, navigate away or update local state.
    } catch (error) {
      setMessage("échec de la mise à jour du produit");
    }
  };

  const handleCancel = () => {
    // Optionally navigate back to your products list.
    router.push("/products");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1 className="text-3xl font-bold mb-6">Mis à jour du produit</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-2">
        <input
          type="text"
          name="name"
          value={productForm.name}
          onChange={handleChange}
          placeholder="Produit"
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
          value={
            categories.find((cat) => cat.id === productForm.categoryId)
              ? {
                  value: productForm.categoryId,
                  label: categories.find((cat) => cat.id === productForm.categoryId).name,
                }
              : null
          }
          placeholder="Categorie"
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
          <h2 className="text-xl font-bold mb-2 mt-6">Points forts</h2>
          {productForm.highlights.map((highlight, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={highlight.title}
                onChange={(e) => handleHighlightChange(index, "title", e.target.value)}
                placeholder="Titre"
                className="border border-gray-300 rounded-md p-2 w-full"
              />
              <input
                type="text"
                value={highlight.description}
                onChange={(e) => handleHighlightChange(index, "description", e.target.value)}
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

        {/* File inputs */}
        <div className="col-span-2 mt-6">
          <h2 className="text-xl font-bold mb-2">Images</h2>
          <input
            type="file"
            multiple
            onChange={handleImageSelection}
            className="border p-2 w-full"
          />
          <div>
            <p>IMages existantes:</p>
            {productForm.img.map((url, index) => (
              <p key={index}>{url}</p>
            ))}
            {selectedImages.length > 0 &&
              selectedImages.map((file, index) => <p key={index}>Nouveaux: {file.name}</p>)}
          </div>
        </div>

        <div className="col-span-2">
          <h2 className="text-xl font-bold mb-2">Datasheet</h2>
          <input type="file" onChange={handleDatasheetSelection} className="border p-2 w-full" />
          <div>
            <p>Datasheet existant: {productForm.datasheet || "None"}</p>
            {selectedDatasheet && <p>Nouveau: {selectedDatasheet.name}</p>}
          </div>
        </div>

        <div className="col-span-2">
          <h2 className="text-xl font-bold mb-2">Brochure</h2>
          <input type="file" onChange={handleBrochureSelection} className="border p-2 w-full" />
          <div>
            <p>Brochure existant: {productForm.brochure || "None"}</p>
            {selectedBrochure && <p>Nouveaux: {selectedBrochure.name}</p>}
          </div>
        </div>

        <div className="col-span-2 flex gap-2 mt-2">
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md flex-1"
            disabled={uploading}
          >
            {uploading ? "Entrain de mis a jour..." : "Mis a jour"}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-500 text-white p-2 rounded-md flex-1"
          >
            Annuler
          </button>
        </div>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}
