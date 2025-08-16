import ProductForm from "../components/ProductForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProduct } from "../api/products";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function AddProduct() {
  const navigate = useNavigate();
  const qc = useQueryClient();

  const mutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product created!");
      navigate("/");
    },
    onError: () => toast.error("Failed to create product!"),
  });

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Add Product</h1>
      <ProductForm onSubmit={(data) => mutation.mutate(data)} />
    </div>
  );
}
