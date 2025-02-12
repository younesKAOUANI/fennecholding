import { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";

const ProductDeleteButton = ({ id, fetchCases }) => {
  const [showModal, setShowModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Called when user confirms deletion
  const confirmDelete = async () => {
    setDeleting(true);
    try {
      // Call your DELETE API endpoint for this product
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });
      if (response.status === 200) {
        console.log("Product deleted successfully");
        fetchCases(); // Re-fetch the products after deletion
        setShowModal(false);
      } else {
        const errorData = await response.json();
        console.error("Error deleting product", errorData);
      }
    } catch (error) {
      console.error("Error deleting product", error);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      {/* Delete button (opens modal) */}
      <button
        onClick={() => setShowModal(true)}
        className="bg-red-500 text-white shadow-md hover:scale-95 hover:shadow-md rounded-full p-2 flex items-center justify-center"
      >
        <MdDeleteOutline className="text-2xl" />
      </button>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p className="mb-6">
              Are you sure you want to delete this product?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDeleteButton;
