import { z } from "zod";

export const createProductSchema = z.object({
    product_code: z
        .number()
        .int()
        .positive({ message: "Product code must be a positive integer" }),

    product_name: z.string().trim().min(1, { message: "Product name is required" }),
    generic_name: z
        .string()
        .trim()
        .min(1, { message: "Generic name is required" }),

    manufacturer: z.string().trim().optional(),

    pack_size: z
        .string()
        .trim()
        .min(1, { message: "Pack size is required" }),

    category: z
        .string()
        .trim()
        .min(1, { message: "Category is required" }),

    expiry_date: z
        .string({ message: "Expiry date is required" }),

    quantity: z
        .number()
        .int()
        .nonnegative({ message: "Quantity must be zero or positive" }),

    mrp: z
        .number()
        .nonnegative({ message: "MRP must be zero or positive" }),

    rate: z
        .number()
        .nonnegative({ message: "Rate must be zero or positive" }),

    discount: z
        .number()
        .min(0, { message: "Discount must be at least 0" })
        .max(100, { message: "Discount cannot exceed 100" }),

    tax: z
        .number()
        .min(0, { message: "Tax must be at least 0" })
        .max(100, { message: "Tax cannot exceed 100" }),

});

export const updateProductSchema = z.object({
    product_code: z
        .number()
        .int()
        .optional(),

    product_name: z.string().trim().optional(),

    generic_name: z
        .string()
        .trim()
        .optional(),

    manufacturer: z.string().trim().optional(),

    pack_size: z
        .string()
        .trim()
        .optional(),

    category: z
        .string()
        .trim()
        .optional(),

    expiry_date: z.string().optional(),

    quantity: z
        .number()
        .int()
        .optional(),

    mrp: z
        .number()
        .optional(),

    rate: z
        .number()
        .optional(),

    discount: z
        .number()
        .optional(),

    tax: z
        .number()
        .optional(),

});

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
