"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from "@/lib/api";
import IProduct from "@/types/product";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, IndianRupee, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function ProductSearchPage() {
  const [query, setQuery] = useState("");
  const [searchBy, setSearchBy] = useState<"code" | "name" | "generic">("code");
  const [results, setResults] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSearch = async () => {
    if (!query) {
      setResults([]);
      return;
    }
    setLoading(true);
    setResults([]);

    try {
      let res;
      if (searchBy === "code") {
        res = await api.get(`/product/code/${query}`);
      } else if (searchBy === "name") {
        res = await api.get(`/product/name/${query}`);
      } else {
        res = await api.get(`/product/generic/${query}`);
      }

      // normalize API response into array
      setResults(
        Array.isArray(res.data.data) ? res.data.data : [res.data.data]
      );
    } catch (error: any) {
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  // 🔑 Auto search with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch();
    }, 500);
    return () => clearTimeout(timer);
  }, [query, searchBy]);

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <Card className="shadow-lg border border-gray-200 rounded-2xl">
        <CardHeader className="pb-4 text-center">
          <CardTitle className="text-3xl font-extrabold text-gray-900 tracking-tight">
            🔍 Search Medicine
          </CardTitle>
          <p className="text-sm text-gray-500">
            Start typing to find medicines by code, name, or generic name
          </p>
        </CardHeader>

        <CardContent>
          {/* Search Controls */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <Select
              value={searchBy}
              onValueChange={(val) => setSearchBy(val as any)}
            >
              <SelectTrigger className="w-full sm:w-40 rounded-xl border-gray-300">
                <SelectValue placeholder="Search by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="code">Code</SelectItem>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="generic">Generic Name</SelectItem>
              </SelectContent>
            </Select>

            <Input
              placeholder={`Enter ${searchBy}...`}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="rounded-xl flex-1 border-gray-300"
            />
          </div>

          {/* Results */}
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm min-h-[120px] overflow-x-auto">
            {loading && (
              <p className="flex items-center gap-2 text-gray-500 text-sm">
                <Loader2 className="h-4 w-4 animate-spin" /> Searching...
              </p>
            )}

            {!loading && results.length === 0 && query && (
              <p className="text-gray-500 text-sm text-center">
                ❌ No product found for{" "}
                <span className="font-medium text-gray-700">{query}</span>
              </p>
            )}

            {results.length > 0 && (
              <table className="w-full text-sm border border-gray-200 rounded-lg">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left">Code</th>
                    <th className="px-4 py-2 text-left">Product Name</th>
                    <th className="px-4 py-2 text-left">Generic Name</th>
                    <th className="px-4 py-2 text-left">Category</th>
                    <th className="px-4 py-2 text-left">Quantity</th>
                    <th className="px-4 py-2 text-left">Expiry Date</th>
                    <th className="px-4 py-2 text-left">Final Rate</th>
                    <th className="px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {results.map((product) => (
                    <tr key={product.id} className="odd:bg-gray-50">
                      <td className="px-4 py-2">{product.generic_name}</td>
                      <td className="px-4 py-2">{product.category}</td>
                      <td className="px-4 py-2">{product.quantity}</td>
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
                      <td className="px-4 py-2">
                        <div className="flex items-center gap-x-1">
                          <IndianRupee className="w-4 h-4 text-green-700" />
                          {product.final_rate}
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <Button
                          className="cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white shadow-md flex items-center gap-x-1"
                          onClick={() => router.push(`/products/${product.id}`)}
                        >
                          <Eye className="h-4 w-4" /> View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
