"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import IProduct from "@/types/product";
import { Separator } from "../ui/separator";

export default function ProductPricingCard({ product }: { product: IProduct }) {
  return (
    <Card className="border-blue-200 shadow-sm h-fit">
      <CardHeader>
        <CardTitle className="text-lg text-emerald-700">Pricing</CardTitle>
        <Separator />
      </CardHeader>

      <CardContent className="overflow-x-auto">
        <table className="w-full text-sm border border-gray-300 rounded-lg overflow-hidden">
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="px-4 py-2 text-gray-600">MRP</td>
              <td className="px-4 py-2 font-medium text-gray-900">
                ₹ {product.mrp}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 text-gray-600">Rate</td>
              <td className="px-4 py-2 font-medium text-gray-900">
                ₹ {product.rate}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 text-gray-600">Discount</td>
              <td className="px-4 py-2 font-medium text-green-700">
                {product.discount} %
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 text-gray-600">Tax</td>
              <td className="px-4 py-2 font-medium text-indigo-700">
                {product.tax} %
              </td>
            </tr>
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
