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
    onError: () => toast.error("Failed!"),
  });

  return (
    <div className="container ">
      <h1 className="text-xl font-bold mb-3 mt-4">Add Product</h1>
      <ProductForm onSubmit={(data) => mutation.mutate(data)} />
    </div>
  );
}
