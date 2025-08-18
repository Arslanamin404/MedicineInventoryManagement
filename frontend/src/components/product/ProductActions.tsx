"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import IProduct from "@/types/product";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Separator } from "../ui/separator";
import { api } from "@/lib/api";
import { useState } from "react";
import { toast } from "sonner"; // ✅ Sonner

export default function ProductActions({ product }: { product: IProduct }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await api.delete(`/product/${Number(product.id)}`);

      toast.success("Product deleted", {
        description: `${
          product.product_name || "Product"
        } was removed successfully.`,
      });

      router.push("/products");
    } catch (error: any) {
      toast.error("Delete failed", {
        description:
          error.response.data?.error?.message ||
          "Something went wrong while deleting the product.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center gap-4 mt-8">
      {/* Cancel */}
      <Button
        variant="outline"
        className="rounded-lg px-6 py-2 text-sm font-medium hover:bg-gray-800 hover:text-white transition cursor-pointer"
        onClick={() => router.back()}
        disabled={loading}
      >
        Cancel
      </Button>

      {/* Edit */}
      <Button
        className="rounded-lg px-6 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white transition cursor-pointer"
        onClick={() => router.push(`/products/edit/${product.id}`)}
        disabled={loading}
      >
        Edit
      </Button>

      {/* Delete with confirmation */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="destructive"
            className="rounded-lg px-6 py-2 text-sm font-medium bg-red-600 hover:bg-red-700 text-white transition cursor-pointer"
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="rounded-xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg font-semibold">
              Delete Product
            </AlertDialogTitle>
            <Separator />
            <AlertDialogDescription className="mt-1.5">
              Are you sure you want to delete{" "}
              <span className="font-semibold">
                {product.product_name || product.product_code}
              </span>
              ? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className="rounded-lg cursor-pointer"
              disabled={loading}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 rounded-lg cursor-pointer"
              disabled={loading}
            >
              {loading ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
