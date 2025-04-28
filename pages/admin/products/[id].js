import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Select from 'react-select';

export default function EditProduct() {
  const router = useRouter();
  const { id } = router.query;
  const [productForm, setProductForm] = useState({
    images: [],
    categoryId: '',
    datasheet: '',
    brochure: '',
    translations: [
      { locale: 'en', name: '', specifications: '', configurations: '', highlights: [{ title: '', description: '' }] },
      { locale: 'fr', name: '', specifications: '', configurations: '', highlights: [{ title: '', description: '' }] },
      { locale: 'ar', name: '', specifications: '', configurations: '', highlights: [{ title: '', description: '' }] },
    ],
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [datasheetFile, setDatasheetFile] = useState(null);
  const [brochureFile, setBrochureFile] = useState(null);
  const [message, setMessage] = useState('');
  const [categories, setCategories] = useState([]);

  // Fetch product and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch product
        const productRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`);
        if (!productRes.ok) throw new Error('Failed to fetch product');
        const { product } = await productRes.json();
        setProductForm({
          images: product.images,
          categoryId: product.categoryId,
          datasheet: product.datasheet || '',
          brochure: product.brochure || '',
          translations: [
            product.translations.find((t) => t.locale === 'en') || {
              locale: 'en',
              name: '',
              specifications: '',
              configurations: '',
              highlights: [{ title: '', description: '' }],
            },
            product.translations.find((t) => t.locale === 'fr') || {
              locale: 'fr',
              name: '',
              specifications: '',
              configurations: '',
              highlights: [{ title: '', description: '' }],
            },
            product.translations.find((t) => t.locale === 'ar') || {
              locale: 'ar',
              name: '',
              specifications: '',
              configurations: '',
              highlights: [{ title: '', description: '' }],
            },
          ],
        });

        // Fetch categories
        const categoriesRes = await fetch('/api/categories');
        if (!categoriesRes.ok) throw new Error('Failed to fetch categories');
        const categoriesData = await categoriesRes.json();
        setCategories(
          categoriesData.map((cat) => ({
            value: cat.id,
            label: cat.translations.find((t) => t.locale === 'fr')?.name || 'N/A',
          }))
        );
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        setMessage('Erreur lors de la récupération des données');
      }
    };
    if (id) fetchData();
  }, [id]);

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (type === 'image') {
      const files = Array.from(e.target.files);
      setImageFiles((prev) => [...prev, ...files]);
    } else if (type === 'datasheet') {
      setDatasheetFile(file);
    } else if (type === 'brochure') {
      setBrochureFile(file);
    }
  };

  const removeFile = (type, index) => {
    if (type === 'image') {
      setImageFiles((prev) => prev.filter((_, i) => i !== index));
      setProductForm((prev) => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index),
      }));
    } else if (type === 'datasheet') {
      setDatasheetFile(null);
      setProductForm((prev) => ({ ...prev, datasheet: '' }));
    } else if (type === 'brochure') {
      setBrochureFile(null);
      setProductForm((prev) => ({ ...prev, brochure: '' }));
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

  const handleHighlightChange = (locale, index, field, value) => {
    setProductForm((prev) => ({
      ...prev,
      translations: prev.translations.map((t) =>
        t.locale === locale
          ? {
              ...t,
              highlights: t.highlights.map((h, i) =>
                i === index ? { ...h, [field]: value } : h
              ),
            }
          : t
      ),
    }));
  };

  const addHighlight = (locale) => {
    setProductForm((prev) => ({
      ...prev,
      translations: prev.translations.map((t) =>
        t.locale === locale
          ? {
              ...t,
              highlights: [...t.highlights, { title: '', description: '' }],
            }
          : t
      ),
    }));
  };

  const removeHighlight = (locale, index) => {
    setProductForm((prev) => ({
      ...prev,
      translations: prev.translations.map((t) =>
        t.locale === locale
          ? {
              ...t,
              highlights: t.highlights.filter((_, i) => i !== index),
            }
          : t
      ),
    }));
  };

  const uploadFileToFTP = async (file, type) => {
    if (!file) throw new Error(`Aucun fichier sélectionné pour ${type}`);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
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
      setMessage('Veuillez sélectionner une catégorie.');
      return;
    }

    if (productForm.images.length === 0 && imageFiles.length === 0) {
      setMessage('Veuillez téléverser au moins une image.');
      return;
    }

    const hasEmptyTranslations = productForm.translations.some(
      (t) => !t.name.trim() || !t.specifications.trim() || !t.configurations.trim()
    );
    if (hasEmptyTranslations) {
      setMessage(
        'Veuillez fournir un nom, des spécifications et des configurations pour chaque langue (Anglais, Français, Arabe).'
      );
      return;
    }

    const hasEmptyHighlights = productForm.translations.some((t) =>
      t.highlights.some((h) => !h.title.trim() || !h.description.trim())
    );
    if (hasEmptyHighlights) {
      setMessage(
        'Veuillez remplir tous les champs des points forts pour chaque langue.'
      );
      return;
    }

    try {
      // Upload new files
      const imageUrls = await Promise.all(
        imageFiles.map((file) => uploadFileToFTP(file, 'image'))
      );
      const updatedImages = [...productForm.images, ...imageUrls];

      let datasheetUrl = productForm.datasheet;
      if (datasheetFile) {
        datasheetUrl = await uploadFileToFTP(datasheetFile, 'fiche technique');
      }
      let brochureUrl = productForm.brochure;
      if (brochureFile) {
        brochureUrl = await uploadFileToFTP(brochureFile, 'brochure');
      }

      const updatedForm = {
        ...productForm,
        images: updatedImages,
        datasheet: datasheetUrl,
        brochure: brochureUrl,
      };

      const res = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedForm),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Échec de la mise à jour du produit');
      }

      setMessage('Produit mis à jour avec succès !');
      setTimeout(() => router.push('/admin/products'), 1500);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du produit:', error);
      setMessage(`Erreur : ${error.message}`);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) return;
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Échec de la suppression du produit');
      }
      setMessage('Produit supprimé avec succès !');
      setTimeout(() => router.push('/admin/products'), 1500);
    } catch (error) {
      console.error('Erreur lors de la suppression du produit:', error);
      setMessage(`Erreur : ${error.message}`);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Modifier le Produit</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Catégorie
          </label>
          <Select
            options={categories}
            value={categories.find((cat) => cat.value === productForm.categoryId)}
            onChange={(selected) =>
              setProductForm((prev) => ({
                ...prev,
                categoryId: selected?.value || '',
              }))
            }
            placeholder="Sélectionner une catégorie"
            isClearable
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Images
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => handleFileChange(e, 'image')}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          {(productForm.images.length > 0 || imageFiles.length > 0) && (
            <div className="mt-2 space-y-2">
              {productForm.images.map((url, index) => (
                <div key={`existing-${index}`} className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">{url}</span>
                  <button
                    type="button"
                    onClick={() => removeFile('image', index)}
                    className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
                  >
                    Supprimer
                  </button>
                </div>
              ))}
              {imageFiles.map((file, index) => (
                <div key={`new-${index}`} className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => removeFile('image', productForm.images.length + index)}
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
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fiche Technique
          </label>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => handleFileChange(e, 'datasheet')}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          {(productForm.datasheet || datasheetFile) && (
            <div className="mt-2 flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {datasheetFile ? datasheetFile.name : productForm.datasheet}
              </span>
              <button
                type="button"
                onClick={() => removeFile('datasheet')}
                className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
              >
                Supprimer
              </button>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Brochure
          </label>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => handleFileChange(e, 'brochure')}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          {(productForm.brochure || brochureFile) && (
            <div className="mt-2 flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {brochureFile ? brochureFile.name : productForm.brochure}
              </span>
              <button
                type="button"
                onClick={() => removeFile('brochure')}
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
              {translation.locale === 'en'
                ? 'Anglais'
                : translation.locale === 'fr'
                ? 'Français'
                : 'Arabe'}
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
                  translation.locale === 'en'
                    ? 'Anglais'
                    : translation.locale === 'fr'
                    ? 'Français'
                    : 'Arabe'
                }`}
                dir={translation.locale === 'ar' ? 'rtl' : 'ltr'}
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
                  translation.locale === 'en'
                    ? 'Anglais'
                    : translation.locale === 'fr'
                    ? 'Français'
                    : 'Arabe'
                }`}
                dir={translation.locale === 'ar' ? 'rtl' : 'ltr'}
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
                  translation.locale === 'en'
                    ? 'Anglais'
                    : translation.locale === 'fr'
                    ? 'Français'
                    : 'Arabe'
                }`}
                dir={translation.locale === 'ar' ? 'rtl' : 'ltr'}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={4}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Points Forts
              </label>
              {translation.highlights.map((highlight, index) => (
                <div key={index} className="flex gap-4 mb-2 items-center">
                  <input
                    type="text"
                    value={highlight.title}
                    onChange={(e) =>
                      handleHighlightChange(
                        translation.locale,
                        index,
                        'title',
                        e.target.value
                      )
                    }
                    placeholder="Titre"
                    dir={translation.locale === 'ar' ? 'rtl' : 'ltr'}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <input
                    type="text"
                    value={highlight.description}
                    onChange={(e) =>
                      handleHighlightChange(
                        translation.locale,
                        index,
                        'description',
                        e.target.value
                      )
                    }
                    placeholder="Description"
                    dir={translation.locale === 'ar' ? 'rtl' : 'ltr'}
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

        <div className="flex gap-4">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Mettre à Jour le Produit
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="w-full bg-red-600 text-white p-3 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Supprimer le Produit
          </button>
        </div>
      </form>
      {message && (
        <p
          className={`mt-4 text-center ${
            message.includes('Erreur') ? 'text-red-600' : 'text-green-600'
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}