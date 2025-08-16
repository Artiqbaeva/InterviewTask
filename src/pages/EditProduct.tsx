import { useParams, useNavigate } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProduct, updateProduct } from "../api/products";
import toast from "react-hot-toast";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const qc = useQueryClient();

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(Number(id)),
  });

  const mutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product updated!");
      navigate("/");
    },
    onError: () => toast.error("This product cannot be updated on DummyJSON API!"),
  });

  if (isLoading) return <p className="flex items-center justify-center h-screen">Loading...</p>;
  if (!product) return <p className="flex items-center justify-center h-screen">Not found</p>;

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Edit Product</h1>
      <ProductForm
        initial={product}
        onSubmit={(d) => mutation.mutate({ ...product, ...d })}
      />
    </div>
  );
}
