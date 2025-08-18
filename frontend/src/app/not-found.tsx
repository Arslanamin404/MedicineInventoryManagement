"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Pill } from "lucide-react";
import { usePathname } from "next/navigation";

export default function NotFound() {
  const pathname = usePathname();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-emerald-900">
      <Card className="max-w-md w-full shadow-lg border-emerald-200">
        <CardContent className="flex flex-col items-center text-center p-8">
          <div className="bg-emerald-100 p-4 rounded-full mb-6">
            <Pill className="h-12 w-12 text-emerald-600" />
          </div>
          <h1 className="text-6xl font-bold text-emerald-700 mb-3">404</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Oops!{" "}
            <span className="bg-yellow-300 px-2 py-1 italic font-semibold text-lg">
              {pathname}
            </span>{" "}
            page not found
          </h2>
          <p className="text-gray-500 mb-6">
            The page you’re looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>
          <Link href="/">
            <Button className="bg-emerald-600 hover:bg-emerald-700 hover:scale-115 duration-300 text-white font-semibold cursor-pointer">
              Back to Home
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
