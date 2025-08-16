import { useForm } from "react-hook-form";
import type { Product } from "./../types/products";

interface Props {
  initial?: Product | null;
  onSubmit: (data: { title: string; price: number }) => void;
}

export default function ProductForm({ initial = null, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: initial?.title || "",
      price: initial?.price || 0,
    },
  });

  return (
    <form
    onSubmit={handleSubmit(onSubmit)}
    className="bg-white p-4 rounded shadow mb-5 flex flex-col md:flex-row gap-4 container  items-start md:items-end"
  >
      <div className="w-full md:w-auto">
        <label className="text-sm">Title: </label>
        <input
          className="border px-2 py-1 rounded"
          {...register("title", { required: "Required" })}
        />
        {errors.title && (
          <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
        )}
      </div>
      <div>
        <label className="text-sm">Price: </label>
        <input
          type="number"
          className="border px-2 py-1 rounded"
          {...register("price", {
            required: "Required",
            min: { value: 1, message: "Must be > 0" },
          })}
        />
        {errors.price && (
          <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>
        )}
      </div>

      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        {initial ? "Update" : "Add"}
      </button>
    </form>
  );
}
