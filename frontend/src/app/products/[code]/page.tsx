"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import IProduct from "@/types/product";
import ProductInfoCard from "@/components/product/ProductInfoCard";
import ProductPricingCard from "@/components/product/ProductPricingCard";
import ProductSummaryCard from "@/components/product/ProductSummaryCard";
import ProductActions from "@/components/product/ProductActions";
import { api } from "@/lib/api";
import { toast } from "sonner";

export default function ProductDetailPage() {
  const params = useParams();
  const { code } = params;
  const [product, setProduct] = useState<IProduct | null>(null);

  const fetchProduct = async () => {
    try {
      const response = await api.get(`/product/code/${code}`);
      setProduct(response.data.data);
    } catch (error: any) {
      console.error("Failed to fetch products:", error);
      toast.error("Failed to fetch products", {
        description:
          error.response.data?.error?.message ||
          "An unexpected error occurred.",
        duration: 5000,
      });
    } finally {
    }
  };

  useEffect(() => {
    fetchProduct();
    if (code) fetchProduct();
  }, [code]);

  if (!product) return <p className="p-4">Loading product...</p>;

  return (
    <div className="px-8 pb-4 space-y-5 bg-emerald-50 min-h-screen">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <ProductInfoCard product={product} />
        <ProductPricingCard product={product} />
      </div>
      <ProductSummaryCard product={product} />
      <ProductActions product={product} />
    </div>
  );
}
