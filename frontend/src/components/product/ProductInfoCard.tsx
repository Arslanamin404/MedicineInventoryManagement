"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import IProduct from "@/types/product";
import { Separator } from "../ui/separator";

export default function ProductInfoCard({ product }: { product: IProduct }) {
  return (
    <Card className=" border border-green-200 shadow-md rounded-2xl hover:shadow-lg transition-shadow w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold text-green-700">
            {product.product_name || product.generic_name}
          </CardTitle>
          <div>
            <p className="text-sm text-gray-500 mt-1">
              Created At:
              <span className="ml-1 font-semibold text-gray-800">
                {product.created_at?.toLocaleString().split("T")[0]}
              </span>
            </p>
          </div>
        </div>
        <Separator />
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="w-full text-sm border border-gray-300 rounded-lg overflow-hidden">
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="px-4 py-2 text-gray-600">Product Name</td>
              <td className="px-4 py-2 font-medium text-gray-900">
                {product.product_name ? product.product_name : "N/A"}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 text-gray-600">Generic Name</td>
              <td className="px-4 py-2 font-medium text-gray-900">
                {product.generic_name}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 text-gray-600">Category</td>
              <td className="px-4 py-2 font-medium text-gray-900">
                {product.category}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 text-gray-600">Manufacturer</td>
              <td className="px-4 py-2 font-medium text-gray-900">
                {product.manufacturer || "—"}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 text-gray-600">Pack Size</td>
              <td className="px-4 py-2 font-medium text-gray-900">
                {product.pack_size}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 text-gray-600">Quantity</td>
              <td className="px-4 py-2 font-medium text-gray-900">
                {product.quantity}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 text-gray-600">Expiry Date</td>
              <td className="px-4 py-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    new Date(product.expiry_date) < new Date()
                      ? "bg-red-200 text-red-800"
                      : "bg-green-200 text-green-800"
                  }`}
                >
                  {product.expiry_date.toLocaleString().split("T")[0]}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
