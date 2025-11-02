const { default: z } = require("zod");

export const textSchema=z.object({
    comment:z.string().max(120,"comment can't exceed 120 characters").min(2,"comment can't be this short")
})

 export const ImageSchema=z.object({
    // image:z.object({
    //     id:z.string(),
    //     url:z.string(),
    //     file:z.instanceof(File).optional()  
    // }).nullable(),
    // article: z.string().min(1, "Article cannot be empty"),
    image: z
    .union([z.string().url(), z.any()])
    .optional()
    .nullable()
    .refine(
      (val) =>
        val === null || typeof val === "object" || typeof val === "string",
      { message: "Invalid image format" }
    ),
 })

 