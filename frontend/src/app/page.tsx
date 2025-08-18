"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { toast } from "sonner";

export default function HomePage() {
  const router = useRouter();
  const [productsCount, setProductsCount] = useState<number>(0);
  const [stockValue, setStockValue] = useState<number>(0);
  const [outOfStockCount, setOutOfStockCount] = useState<number>(0);

  const fetchProductCount = async () => {
    try {
      const res = await api.get("/product/stats/count");
      setProductsCount(res.data.data.count ?? 0);
      // console.log(res.data.data.count);
    } catch (error: any) {
      console.log(error);
      toast.error("Error fetching product count", {
        description:
          error.response?.data?.error?.message ||
          "An unexpected error occurred.",
        duration: 5000,
      });
    }
  };

  const fetchStockValue = async () => {
    try {
      const res = await api.get("/product/stats/value");
      setStockValue(res.data.data._sum.final_amount ?? 0);
      // console.log(res.data.data._sum.final_amount);
    } catch (error: any) {
      console.log(error);
      toast.error("Error fetching stock value", {
        description:
          error.response?.data?.error?.message ||
          "An unexpected error occurred.",
        duration: 5000,
      });
    }
  };

  const fetchOutOfStockCount = async () => {
    try {
      const res = await api.get("/product/stats/out-of-stock");
      setOutOfStockCount(res.data.data.count ?? 0);
      // console.log(res.data.data.count);
    } catch (error: any) {
      console.log(error);
      toast.error("Error fetching out of stock count", {
        description:
          error.response?.data?.error?.message ||
          "An unexpected error occurred.",
        duration: 5000,
      });
    }
  };

  useEffect(() => {
    Promise.all([
      fetchProductCount(),
      fetchStockValue(),
      fetchOutOfStockCount(),
    ]);
  }, []);

  const summary = [
    {
      title: "Total Products",
      value: productsCount,
      color: "bg-green-50",
      text: "text-green-700",
    },
    {
      title: "Stock Value",
      value: `₹ ${stockValue}`,
      color: "bg-blue-50",
      text: "text-blue-700",
    },
    {
      title: "Expired Products",
      value: 5,
      color: "bg-red-50",
      text: "text-red-700",
    },
    {
      title: "Out of Stock",
      value: outOfStockCount,
      color: "bg-yellow-50",
      text: "text-yellow-700",
    },
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {summary.map((item) => (
          <Card
            key={item.title}
            className={`${item.color} shadow-md hover:shadow-lg transition-shadow duration-200 gap-y-1`}
          >
            <CardHeader>
              <CardTitle className={`text-lg font-semibold ${item.text}`}>
                {item.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className={`md:text-4xl font-extrabold ${item.text}`}>
                {item.value}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Button */}
      <div className="flex justify-center">
        <Button
          size="lg"
          className="bg-emerald-800 text-md
           px-5 hover:bg-emerald-800 hover:scale-105 duration-300 cursor-pointer"
          onClick={() => router.push("/products")}
        >
          View All Products
        </Button>
      </div>
    </div>
  );
}
