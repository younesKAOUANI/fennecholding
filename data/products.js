import ProductDeleteButton from "@/components/main/ProductDeleteButton";
import Image from "next/image";
import Link from "next/link";
import { CiEdit } from "react-icons/ci";

export const productsTableView = (fetchCases) => [
  { Header: "Id", Cell: ({ row }) => <div>{row.index + 1}</div> },
  { Header: "Nom", accessor: "name" },
  { Header: "Categorie", accessor: "category.name" },
  { 
    Header: "Image", 
    accessor: "images", 
    Cell: ({ row }) => (
      <div>
        <Image
          height={200}
          width={200}
          src={row.original.images[0]}
          className="rounded-md"
          alt={`Category ${row.original.name} Image`}
        />
      </div>
    ) 
  },
  { 
    Header: "Dernier Modification", 
    Cell: ({ row }) => (
      <div>
        {new Date(row.original.updatedAt).toLocaleString("fr-FR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })}
      </div>
    ) 
  },
  {
    Header: "",
    accessor: "actions",
    disableSortBy: true,
    disableGlobalFilter: true,
    Cell: ({ row }) => (
      <div className="w-auto my-2 flex gap-4">
        <Link
          href={`/admin/products/${row.original.id}`}
          className="bg-blue-500 text-white shadow-md hover:scale-95 hover:shadow-md rounded-full p-2 flex items-center justify-center"
        >
          <CiEdit className="text-2xl" />
        </Link>
        <ProductDeleteButton id={row.original.id} fetchCases={fetchCases} />
      </div>
    ),
  },
];
