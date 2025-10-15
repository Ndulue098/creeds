import { z } from "zod";

export const announcementSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters long")
    .max(100, "Title too long"),

  message: z
    .string()
    .min(5, "Message must be at least 5 characters long")
    .max(500, "Message too long"),

  image: z
    .union([z.string().url(), z.any()])
    .optional()
    .nullable()
    .refine(
      (val) =>
        val === null || typeof val === "object" || typeof val === "string",
      { message: "Invalid image format" }
    ),
});
//  export const ImageSchema=z.object({
// image:z.object({
//     id:z.string(),
//     url:z.string(),
//     file:z.instanceof(File).optional()
// }).nullable(),
//     article: z.string().min(1, "Article cannot be empty"),
//  })
