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
      toast.success("Updated!");
      navigate("/");
    },
    onError: () => toast.error("This product cannot be updated on DummyJSON API!")
  });

  if (isLoading) return <p>Loading...</p>;
  if (!product) return <p>Not found</p>;

  return (
    <div className="container">
      <h1 className="text-xl font-bold mb-3 mt-4">Edit Product</h1>
      <ProductForm
        initial={product}
        onSubmit={(d) => mutation.mutate({ ...product, ...d })}
      />
    </div>
  );
}
