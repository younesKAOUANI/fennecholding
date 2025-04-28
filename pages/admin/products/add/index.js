import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Select from "react-select";

export default function AddProduct() {
  const router = useRouter();
  const [productForm, setProductForm] = useState({
    images: [],
    categoryId: "",
    datasheet: "",
    brochure: "",
    translations: [
      { locale: "en", name: "", specifications: "", configurations: "", highlights: [""] },
      { locale: "fr", name: "", specifications: "", configurations: "", highlights: [""] },
      { locale: "ar", name: "", specifications: "", configurations: "", highlights: [""] },
    ],
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [datasheetFile, setDatasheetFile] = useState(null);
  const [brochureFile, setBrochureFile] = useState(null);
  const [message, setMessage] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories/`);
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        setCategories(
          data.map((cat) => ({
            value: cat.id,
            label: cat.translations.find((t) => t.locale === "fr")?.name || "N/A",
          }))
        );
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories:", error);
        setMessage("Erreur lors de la récupération des catégories");
      }
    };
    fetchCategories();
  }, []);

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (type === "image") {
      const files = Array.from(e.target.files);
      setImageFiles((prev) => [...prev, ...files]);
    } else if (type === "datasheet") {
      setDatasheetFile(file);
    } else if (type === "brochure") {
      setBrochureFile(file);
    }
  };

  const removeFile = (type, index) => {
    if (type === "image") {
      setImageFiles((prev) => prev.filter((_, i) => i !== index));
      setProductForm((prev) => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index),
      }));
    } else if (type === "datasheet") {
      setDatasheetFile(null);
      setProductForm((prev) => ({ ...prev, datasheet: "" }));
    } else if (type === "brochure") {
      setBrochureFile(null);
      setProductForm((prev) => ({ ...prev, brochure: "" }));
    }
  };

  const handleChange = (e, locale) => {
    const { name, value } = e.target;
    setProductForm((prev) => ({
      ...prev,
      translations: prev.translations.map((t) =>
        t.locale === locale ? { ...t, [name]: value } : t
      ),
    }));
  };

  const handleHighlightChange = (locale, index, value) => {
    setProductForm((prev) => ({
      ...prev,
      translations: prev.translations.map((t) =>
        t.locale === locale
          ? {
              ...t,
              highlights: t.highlights.map((h, i) => (i === index ? value : h)),
            }
          : t
      ),
    }));
  };

  const addHighlight = (locale) => {
    setProductForm((prev) => ({
      ...prev,
      translations: prev.translations.map((t) =>
        t.locale === locale ? { ...t, highlights: [...t.highlights, ""] } : t
      ),
    }));
  };

  const removeHighlight = (locale, index) => {
    setProductForm((prev) => ({
      ...prev,
      translations: prev.translations.map((t) =>
        t.locale === locale
          ? { ...t, highlights: t.highlights.filter((_, i) => i !== index) }
          : t
      ),
    }));
  };

  const uploadFileToFTP = async (file, type) => {
    if (!file) throw new Error(`Aucun fichier sélectionné pour ${type}`);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error(`Échec du téléchargement du ${type}`);
      const { fileUrl } = await response.json();
      return fileUrl;
    } catch (error) {
      throw new Error(`Erreur lors du téléchargement du ${type}: ${error.message}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productForm.categoryId) {
      setMessage("Veuillez sélectionner une catégorie.");
      return;
    }

    if (imageFiles.length === 0) {
      setMessage("Veuillez téléverser au moins une image.");
      return;
    }

    const hasEmptyTranslations = productForm.translations.some(
      (t) => !t.name.trim() || !t.specifications.trim() || !t.configurations.trim()
    );
    if (hasEmptyTranslations) {
      setMessage(
        "Veuillez fournir un nom, des spécifications et des configurations pour chaque langue (Anglais, Français, Arabe)."
      );
      return;
    }

    const hasEmptyHighlights = productForm.translations.some((t) =>
      t.highlights.some((h) => !h.trim())
    );
    if (hasEmptyHighlights) {
      setMessage("Veuillez remplir tous les champs des points forts pour chaque langue.");
      return;
    }

    try {
      const imageUrls = await Promise.all(
        imageFiles.map((file) => uploadFileToFTP(file, "image"))
      );
      let datasheetUrl = "";
      if (datasheetFile) datasheetUrl = await uploadFileToFTP(datasheetFile, "fiche technique");
      let brochureUrl = "";
      if (brochureFile) brochureUrl = await uploadFileToFTP(brochureFile, "brochure");

      const updatedForm = {
        ...productForm,
        images: imageUrls,
        datasheet: datasheetUrl,
        brochure: brochureUrl,
      };

      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedForm),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Échec de la création du produit");
      }

      setMessage("Produit créé avec succès !");
      setProductForm({
        images: [],
        categoryId: "",
        datasheet: "",
        brochure: "",
        translations: [
          { locale: "en", name: "", specifications: "", configurations: "", highlights: [""] },
          { locale: "fr", name: "", specifications: "", configurations: "", highlights: [""] },
          { locale: "ar", name: "", specifications: "", configurations: "", highlights: [""] },
        ],
      });
      setImageFiles([]);
      setDatasheetFile(null);
      setBrochureFile(null);
      setTimeout(() => router.push("/admin/products"), 1500);
    } catch (error) {
      console.error("Erreur lors de la création du produit:", error);
      setMessage(`Erreur : ${error.message}`);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Ajouter un Produit</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
          <Select
            options={categories}
            onChange={(selected) =>
              setProductForm((prev) => ({ ...prev, categoryId: selected?.value || "" }))
            }
            placeholder="Sélectionner une catégorie"
            isClearable
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Images</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => handleFileChange(e, "image")}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          {imageFiles.length > 0 && (
            <div className="mt-2 space-y-2">
              {imageFiles.map((file, index) => (
                <div key={index} className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => removeFile("image", index)}
                    className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
                  >
                    Supprimer
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Fiche Technique</label>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => handleFileChange(e, "datasheet")}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          {datasheetFile && (
            <div className="mt-2 flex items-center gap-4">
              <span className="text-sm text-gray-600">{datasheetFile.name}</span>
              <button
                type="button"
                onClick={() => removeFile("datasheet")}
                className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
              >
                Supprimer
              </button>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Brochure</label>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => handleFileChange(e, "brochure")}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          {brochureFile && (
            <div className="mt-2 flex items-center gap-4">
              <span className="text-sm text-gray-600">{brochureFile.name}</span>
              <button
                type="button"
                onClick={() => removeFile("brochure")}
                className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
              >
                Supprimer
              </button>
            </div>
          )}
        </div>

        {productForm.translations.map((translation) => (
          <div key={translation.locale} className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Traduction (
              {translation.locale === "en"
                ? "Anglais"
                : translation.locale === "fr"
                ? "Français"
                : "Arabe"}
              )
            </h2>
            <div>
              <label
                htmlFor={`name-${translation.locale}`}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Nom
              </label>
              <input
                type="text"
                id={`name-${translation.locale}`}
                name="name"
                value={translation.name}
                onChange={(e) => handleChange(e, translation.locale)}
                placeholder={`Nom en ${
                  translation.locale === "en" ? "Anglais" : translation.locale === "fr" ? "Français" : "Arabe"
                }`}
                dir={translation.locale === "ar" ? "rtl" : "ltr"}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor={`specifications-${translation.locale}`}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Spécifications
              </label>
              <textarea
                id={`specifications-${translation.locale}`}
                name="specifications"
                value={translation.specifications}
                onChange={(e) => handleChange(e, translation.locale)}
                placeholder={`Spécifications en ${
                  translation.locale === "en" ? "Anglais" : translation.locale === "fr" ? "Français" : "Arabe"
                }`}
                dir={translation.locale === "ar" ? "rtl" : "ltr"}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={4}
              />
            </div>
            <div>
              <label
                htmlFor={`configurations-${translation.locale}`}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Configurations
              </label>
              <textarea
                id={`configurations-${translation.locale}`}
                name="configurations"
                value={translation.configurations}
                onChange={(e) => handleChange(e, translation.locale)}
                placeholder={`Configurations en ${
                  translation.locale === "en" ? "Anglais" : translation.locale === "fr" ? "Français" : "Arabe"
                }`}
                dir={translation.locale === "ar" ? "rtl" : "ltr"}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={4}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Points Forts</label>
              {translation.highlights.map((highlight, index) => (
                <div key={index} className="flex gap-4 mb-2 items-center">
                  <input
                    type="text"
                    value={highlight}
                    onChange={(e) => handleHighlightChange(translation.locale, index, e.target.value)}
                    placeholder="Titre"
                    dir={translation.locale === "ar" ? "rtl" : "ltr"}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  {translation.highlights.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeHighlight(translation.locale, index)}
                      className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
                    >
                      Supprimer
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addHighlight(translation.locale)}
                className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
              >
                Ajouter un Point Fort
              </button>
            </div>
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Ajouter Produit
        </button>
      </form>
      {message && (
        <p
          className={`mt-4 text-center ${message.includes("Erreur") ? "text-red-600" : "text-green-600"}`}
        >
          {message}
        </p>
      )}
    </div>
  );
}