import Image from "next/image";
import Link from "next/link";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

export const categoriesTableView = (fetchCases) => [
  {
    Header: "ID",
    Cell: ({ row }) => <div>{row.index + 1}</div>,
  },
  {
    Header: "Nom (Anglais)",
    accessor: "translations",
    id: "name_en",
    Cell: ({ row }) => {
      const enTranslation = row.original.translations.find((t) => t.locale === "en");
      return enTranslation ? enTranslation.name : "N/A";
    },
  },
  {
    Header: "Nom (Français)",
    accessor: "translations",
    id: "name_fr",
    Cell: ({ row }) => {
      const frTranslation = row.original.translations.find((t) => t.locale === "fr");
      return frTranslation ? frTranslation.name : "N/A";
    },
  },
  {
    Header: "Nom (Arabe)",
    accessor: "translations",
    id: "name_ar",
    Cell: ({ row }) => {
      const arTranslation = row.original.translations.find((t) => t.locale === "ar");
      return arTranslation ? <span dir="rtl">{arTranslation.name}</span> : "N/A";
    },
  },
  {
    Header: "Actions",
    accessor: "actions",
    disableSortBy: true,
    disableGlobalFilter: true,
    Cell: ({ row }) => (
      <div className="flex gap-4">
        {/* <Link
          href={`/admin/categories/edit/${row.original.id}`}
          className="bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 flex items-center justify-center"
        >
          <CiEdit className="text-2xl" />
        </Link> */}
        <DeleteButton id={row.original.id} fetchCases={fetchCases} />
      </div>
    ),
  },
];

const DeleteButton = ({ id, fetchCases }) => {
  const handleDelete = async () => {
    if (!confirm("Voulez-vous supprimer cette catégorie ?")) return;

    try {
      const response = await fetch(`/api/categories?id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Échec de la suppression de la catégorie");
      }

      console.log("Catégorie supprimée avec succès");
      fetchCases(); // Re-fetch the categories after deletion
    } catch (error) {
      console.error("Erreur lors de la suppression de la catégorie:", error);
      alert(`Erreur : ${error.message}`);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 text-white shadow-md hover:scale-95 hover:shadow-sm rounded-full p-2 flex items-center justify-center"
    >
      <MdDeleteOutline className="text-2xl" />
    </button>
  );
};

export default DeleteButton;