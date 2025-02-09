import Image from "next/image";
import Link from "next/link";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

export const categoriesTableView = (fetchCases) => [
  { Header: "Id", Cell: ({ row }) => <div>{row.index + 1}</div> },
  { Header: "Nom", accessor: "name" },
  { Header: "Image", accessor: "img", Cell: ({ row }) => <div><Image height={200} width={200} src={row.original.img} className="rounded-md" alt={`Category ${row.original.name} Image`} /></div> },
  {
    Header: "",
    accessor: "actions",
    disableSortBy: true,
    disableGlobalFilter: true,
    Cell: ({ row }) => (
      <div className="w-auto my-2 flex gap-4">
        <Link href={`/cases/${row.original.id}`} className="bg-blue-500 text-white shadow-md hover:scale-95 hover:shadow-md rounded-full p-2 flex items-center justify-center">
          <CiEdit className="text-2xl" />
        </Link>
        <DeleteButton id={row.original.id} fetchCases={fetchCases} />
      </div>
    ),
  },
];

const DeleteButton = ({ id, fetchCases }) => {
  const handleDelete = async () => {
    try {
      // const response = await axios.delete(API_ENDPOINTS.DELETE_CASE(id));

      if (response.status === 200) {
        console.log('Case deleted successfully');
        fetchCases(); // Re-fetch the cases after deletion
      } else {
        console.error('Error deleting case', response.data);
      }
    } catch (error) {
      console.error('Error deleting case', error);
    }
  };

  return (
    <Link href={'#'}
      onClick={handleDelete}
      className="bg-red-500 text-white shadow-md hover:scale-95 hover:shadow-md rounded-full p-2 flex items-center justify-center"
    >
      <MdDeleteOutline className="text-2xl t" />
    </Link>
  );
};

export default DeleteButton;
