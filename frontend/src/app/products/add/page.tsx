"use client";

import ProductForm from "@/components/product/productForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Pill } from "lucide-react";

export default function AddMedicinePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100 p-8">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-lg border-emerald-200">
          <CardHeader className="flex flex-row items-center gap-3 border-b pb-4">
            <div className="bg-emerald-100 p-3 rounded-full">
              <Pill className="h-8 w-8 text-emerald-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-emerald-700">
              Add New Medicine
            </CardTitle>
          </CardHeader>

          <CardContent className="mt-4">
            <ProductForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
