import { useState } from "react";
import { fetchProducts, deleteProduct } from "../api/products";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const PRODUCTS_PER_PAGE = 10;

const ProductsList = () => {
  const [page, setPage] = useState(1);
  const qc = useQueryClient();


  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["products"] });
      toast.success("Deleted!");
    },
    onError: () => toast.error("Delete failed!"),
  });

  if (isLoading) return <p className="flex items-center justify-center">Loading...</p>;

 
  const showing = data?.products.slice(
    (page - 1) * PRODUCTS_PER_PAGE,
    page * PRODUCTS_PER_PAGE
  );

  return (
    <div className="container">
      <table className="bg-white w-full rounded shadow  mt-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">ID</th>
            <th className="p-2">Title</th>
            <th className="p-2">Price</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {showing?.map((p) => (
            <tr key={p.id} className="border-t">
              <td className="p-2">{p.id}</td>
              <td className="p-2">{p.title}</td>
              <td className="p-2">${p.price}</td>
              <td className="p-2 flex gap-2">
                <Link
                  to={`/edit/${p.id}`}
                  className="px-2 py-1 bg-yellow-500 text-white rounded"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteMutation.mutate(p.id)}
                  className="px-2 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex gap-2">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-3 py-1 rounded bg-blue-600 text-white disabled:bg-gray-300"
        >
          Prev
        </button>
        <button
          disabled={page * PRODUCTS_PER_PAGE >= (data?.products.length || 0)}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 rounded bg-blue-600 text-white disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductsList;
