"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import IProduct from "@/types/product";
import { Separator } from "../ui/separator";

export default function ProductSummaryCard({ product }: { product: IProduct }) {
  return (
    <Card className="border-purple-200 shadow-md">
      <CardHeader>
        <CardTitle className="text-lg text-emerald-700">Summary</CardTitle>
        <Separator />
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="w-full text-sm border border-gray-300 rounded-lg overflow-hidden">
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="px-4 py-2 text-gray-600">Gross Amount</td>
              <td className="px-4 py-2 font-medium text-gray-900">
                ₹ {product.gross_amount}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 text-gray-600">Final Rate</td>
              <td className="px-4 py-2 font-medium text-gray-900">
                ₹ {product.final_rate}
              </td>
            </tr>
            <tr className="bg-emerald-100">
              <td className="px-4 py-3 font-semibold text-emerald-900">
                Final Amount
              </td>
              <td className="px-4 py-3 font-bold text-xl text-emerald-900">
                ₹ {product.final_amount}
              </td>
            </tr>
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
