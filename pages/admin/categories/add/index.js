import React, { useState } from "react";
import { useRouter } from "next/router";

export default function AddCategory() {
  const router = useRouter();
  const [categoryForm, setCategoryForm] = useState({
    translations: [
      { locale: "en", name: "" },
      { locale: "fr", name: "" },
      { locale: "ar", name: "" },
    ],
  });
  const [message, setMessage] = useState("");

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    if (name.startsWith("translations")) {
      const updatedTranslations = [...categoryForm.translations];
      updatedTranslations[index].name = value;
      setCategoryForm((prev) => ({
        ...prev,
        translations: updatedTranslations,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasEmptyNames = categoryForm.translations.some((t) => !t.name.trim());
    if (hasEmptyNames) {
      setMessage(
        "Veuillez fournir un nom pour chaque langue (Anglais, Français, Arabe)."
      );
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(categoryForm),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          errorData.message || "Échec de la création de la catégorie"
        );
      }

      setMessage("Catégorie créée avec succès !");
      setCategoryForm({
        translations: [
          { locale: "en", name: "" },
          { locale: "fr", name: "" },
          { locale: "ar", name: "" },
        ],
      });
      setTimeout(() => router.push("/admin/categories"), 1500);
    } catch (error) {
      console.error("Erreur lors de la création de la catégorie:", error);
      setMessage(`Erreur : ${error.message}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Ajouter une Catégorie
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Traductions
          </h2>
          <div className="space-y-4">
            {categoryForm.translations.map((translation, index) => (
              <div
                key={translation.locale}
                className="grid grid-cols-3 gap-4 items-center"
              >
                <div className="col-span-2">
                  <label
                    htmlFor={`translation-${translation.locale}`}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {translation.locale === "en"
                      ? "Anglais"
                      : translation.locale === "fr"
                      ? "Français"
                      : "Arabe"}
                  </label>
                  <input
                    type="text"
                    id={`translation-${translation.locale}`}
                    name={`translations[${index}].name`}
                    placeholder={`Nom en ${
                      translation.locale === "en"
                        ? "Anglais"
                        : translation.locale === "fr"
                        ? "Français"
                        : "Arabe"
                    }`}
                    value={translation.name}
                    onChange={(e) => handleChange(e, index)}
                    dir={translation.locale === "ar" ? "rtl" : "ltr"}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Locale
                  </label>
                  <input
                    type="text"
                    value={translation.locale.toUpperCase()}
                    disabled
                    className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Ajouter Catégorie
        </button>
      </form>
      {message && (
        <p
          className={`mt-4 text-center ${
            message.includes("Erreur") ? "text-red-600" : "text-green-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}