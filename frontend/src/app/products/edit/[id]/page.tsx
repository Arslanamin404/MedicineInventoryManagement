"use client";

import { api } from "@/lib/api";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProductForm from "@/components/product/productForm";
import IProduct from "@/types/product";
import { toast } from "sonner";

export default function EditProductPage() {
  const { id } = useParams();
  console.log("code", id);

  const [product, setProduct] = useState<IProduct>();

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await api.get(`/product/${Number(id)}`);
        setProduct(res.data.data);
        console.log("Fetched product:", res.data.data);
      } catch (error: any) {
        toast.error("Error occurred", {
          description:
            error.response.data?.error?.message ||
            "An unexpected error occurred.",
          duration: 5000,
        });
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="flex justify-center py-10">
      <div className="w-full max-w-3xl bg-white shadow-md rounded-2xl p-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Edit Medicine</h1>
        <ProductForm defaultValues={product} id={Number(id)} />
      </div>
    </div>
  );
}
