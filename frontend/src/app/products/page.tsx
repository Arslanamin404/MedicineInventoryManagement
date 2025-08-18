"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import { api } from "@/lib/api";
import IProduct from "@/types/product";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ViewMedicinesPage() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchProducts = async () => {
    try {
      const response = await api.get("/product");
      setProducts(response.data.data);
    } catch (error: any) {
      console.error("Failed to fetch products:", error);
      toast.error("Failed to fetch products", {
        description:
          error.response.data?.error?.message ||
          "An unexpected error occurred.",
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <Button
          className="cursor-pointer"
          onClick={() => router.push("/products/add")}
        >
          + Add Product
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Expiry</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Final Rate</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((p) => (
            <TableRow
              className="cursor-pointer"
              onClick={() => router.push(`/products/${p.id}`)}
              key={p.id}
            >
              <TableCell>{p.product_name || p.generic_name}</TableCell>
              <TableCell>{p.category}</TableCell>
              <TableCell>
                {p.expiry_date.toLocaleString().split("T")[0]}
              </TableCell>
              <TableCell>{p.quantity}</TableCell>
              <TableCell>₹ {p.final_rate}</TableCell>
              <TableCell>
                {p.created_at?.toLocaleString().split("T")[0]}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
