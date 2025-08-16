import axios from "axios";
import type { Product, ProductsResponse } from "../types/products";

const api = axios.create({
  baseURL: "https://dummyjson.com",
});

export const fetchProducts = async (): Promise<ProductsResponse> => {
  const { data } = await api.get(`/products?limit=200&skip=0`);
  return data;
};

export const getProduct = async (id: number): Promise<Product> => {
  const { data } = await api.get(`/products/${id}`);
  return data;
};

export const addProduct = (product: Omit<Product, "id">) =>
  api.post("/products/add", product);

export const updateProduct = (product: Product) =>
  api.put(`/products/${product.id}`, product);

export const deleteProduct = (id: number) =>
  api.delete(`/products/${id}`);
