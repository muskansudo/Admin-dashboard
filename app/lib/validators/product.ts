import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name too long"),

  price: z
    .number()
    .positive("Price must be greater than 0"),

  category: z
    .string()
    .min(2, "Category is required"),

  stock: z
    .number()
    .int("Stock must be an integer")
    .nonnegative("Stock cannot be negative"),

  image: z
    .string()
    .url("Invalid image URL")
    .optional()
    .or(z.literal("")), // ✅ allow empty string
});

export type ProductInput = z.infer<typeof productSchema>;
