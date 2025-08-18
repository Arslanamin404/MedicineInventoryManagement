"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import IProduct from "@/types/product"; // your interface
import { useRouter } from "next/navigation";

export default function ProductForm({
  defaultValues,
  id,
}: {
  defaultValues?: Partial<IProduct>;
  id?: number;
}) {
  const form = useForm<IProduct>({
    defaultValues: defaultValues ?? {
      product_name: "",
      generic_name: "",
      manufacturer: "",
      pack_size: "",
      category: "",
      expiry_date: "",
      quantity: 1,
      mrp: 0,
      rate: 0,
      discount: 0,
      tax: 0,
      gross_amount: 0,
      final_amount: 0,
      final_rate: 0,
    },
  });

  // Watch fields for auto-calculation
  const quantity = form.watch("quantity");
  const rate = form.watch("rate");
  const discount = form.watch("discount");
  const tax = form.watch("tax");

  const router = useRouter();

  useEffect(() => {
    const numStockQty = Number(quantity) || 0;
    const numRate = Number(rate) || 0;
    const numDiscount = Number(discount) || 0;
    const numTax = Number(tax) || 0;

    if (numStockQty > 0 && numRate > 0) {
      const gross = numRate * numStockQty;
      const subtotal = gross - numDiscount;
      const total = subtotal + (subtotal * numTax) / 100;
      const final_rate = total / numStockQty;

      form.setValue("gross_amount", parseFloat(gross.toFixed(2)));
      form.setValue("final_amount", parseFloat(total.toFixed(2)));
      form.setValue("final_rate", parseFloat(final_rate.toFixed(2)));
    }
  }, [quantity, rate, discount, tax, form]);

  const onSubmit = async (values: IProduct) => {
    const payload: IProduct = {
      ...values,
      expiry_date: new Date(values.expiry_date).toISOString(),
      discount: Number(values.discount),
      mrp: Number(values.mrp),
      rate: Number(values.rate),
      gross_amount: Number(values.gross_amount),
      quantity: Number(values.quantity),
      tax: Number(values.tax),
      final_rate: Number(values.final_rate),
      final_amount: Number(values.final_amount),
    };

    if (id) {
      try {
        await api.put(`/product/edit/${id}`, payload);
        toast.success("Medicine updated successfully!", {
          description: `${values.generic_name} has been updated to the inventory.`,
          duration: 5000,
        });
        router.push("/products");
      } catch (error: any) {
        console.error("API Error:", error.response.data);
        toast.error("Error occurred", {
          description:
            error.response.data?.error?.message ||
            "An unexpected error occurred.",
          duration: 5000,
        });
      }
    } else {
      try {
        await api.post("/product", payload);
        toast.success("Medicine saved successfully!", {
          description: `${values.generic_name} has been saved to the inventory.`,
          duration: 5000,
        });
        form.reset();
      } catch (error: any) {
        console.log(error.response.data?.error?.message);
        toast.error("Error occurred", {
          description:
            error.response.data?.error?.message ||
            "An unexpected error occurred.",
          duration: 5000,
        });
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            name="product_name"
            control={form.control}
            rules={{ required: "Product name is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name </FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Paracetamol 500mg" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="generic_name"
            control={form.control}
            rules={{ required: "Generic name is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Generic Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Paracetamol" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4">
          <FormField
            name="manufacturer"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Manufacturer</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., ABC Pharma Ltd." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="pack_size"
            control={form.control}
            rules={{ required: "Pack size is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pack Size </FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 10 Tablets" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="category"
            control={form.control}
            rules={{ required: "Category is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category </FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {/* Medicines - Dosage Forms */}
                    <SelectGroup>
                      <SelectLabel>Medicines - Dosage Forms</SelectLabel>
                      <SelectItem value="tablet">Tablet</SelectItem>
                      <SelectItem value="capsule">Capsule</SelectItem>
                      <SelectItem value="syrup">Syrup</SelectItem>
                      <SelectItem value="injection">Injection</SelectItem>
                      <SelectItem value="ointment">Ointment</SelectItem>
                      <SelectItem value="cream">Cream</SelectItem>
                      <SelectItem value="lotion">Lotion</SelectItem>
                      <SelectItem value="drops">
                        Drops (Eye/Ear/Nasal)
                      </SelectItem>
                      <SelectItem value="powder">Powder</SelectItem>
                      <SelectItem value="inhaler">Inhaler</SelectItem>
                      <SelectItem value="spray">Spray</SelectItem>
                      <SelectItem value="sachet">Sachet</SelectItem>
                    </SelectGroup>

                    <SelectSeparator />

                    {/* Personal Care & Hygiene */}
                    <SelectGroup>
                      <SelectLabel>Personal Care & Hygiene</SelectLabel>
                      <SelectItem value="soap">
                        Soap (Medicated / Antiseptic)
                      </SelectItem>
                      <SelectItem value="shampoo">
                        Shampoo (Medicated)
                      </SelectItem>
                      <SelectItem value="handwash">
                        Hand Wash / Sanitizer
                      </SelectItem>
                      <SelectItem value="bodywash">Body Wash</SelectItem>
                      <SelectItem value="oralcare">
                        Toothpaste / Mouthwash (Medicated)
                      </SelectItem>
                    </SelectGroup>

                    <SelectSeparator />

                    {/* Health & Nutrition */}
                    <SelectGroup>
                      <SelectLabel>Health & Nutrition</SelectLabel>
                      <SelectItem value="supplement">
                        Supplements / Vitamins
                      </SelectItem>
                      <SelectItem value="nutrition">
                        Protein / Nutritional Powder
                      </SelectItem>
                    </SelectGroup>

                    <SelectSeparator />

                    {/* Medical Devices */}
                    <SelectGroup>
                      <SelectLabel>Medical Devices</SelectLabel>
                      <SelectItem value="thermometer">Thermometer</SelectItem>
                      <SelectItem value="bpmonitor">BP Monitor</SelectItem>
                      <SelectItem value="glucometer">Glucometer</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Row 4 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            name="expiry_date"
            control={form.control}
            rules={{ required: "Expiry date is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Expiry Date </FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    {...field}
                    min={new Date().toISOString().split("T")[0]}
                    value={
                      field.value
                        ? new Date(field.value).toISOString().split("T")[0] // -> "2027-05-15"
                        : ""
                    }
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="quantity"
            control={form.control}
            rules={{ required: "Quantity is required", min: 1 }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock Quantity </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={1}
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Row 5 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            name="mrp"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>MRP</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    min={0}
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="rate"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rate</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    min={0}
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Row 6 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            name="discount"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Discount</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    min={0}
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="tax"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tax (%)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    min={0}
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Calculated Fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormField
            name="gross_amount"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gross Amount (Auto-calculated)</FormLabel>
                <FormControl>
                  <Input
                    readOnly
                    value={field.value}
                    className="bg-gray-50 cursor-not-allowed"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="final_amount"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Final Amount (Auto-calculated)</FormLabel>
                <FormControl>
                  <Input
                    readOnly
                    value={field.value}
                    className="bg-gray-50 cursor-not-allowed"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="final_rate"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Final Rate (Auto-calculated)</FormLabel>
                <FormControl>
                  <Input
                    readOnly
                    value={field.value}
                    className="bg-gray-50 cursor-not-allowed"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4 pt-4 border-t">
          <Button
            className="cursor-pointer"
            type="button"
            variant="outline"
            onClick={() => router.push("/products")}
          >
            Cancel
          </Button>
          <Button
            className="cursor-pointer"
            type="button"
            variant="destructive"
            onClick={() => form.reset()}
          >
            Reset Form
          </Button>
          <Button className="cursor-pointer" type="submit">
            {id ? "Update" : "Save"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
