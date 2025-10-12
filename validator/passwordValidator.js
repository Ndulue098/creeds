import { z } from "zod";

export const passwordValidation = z
  .string()
  .refine((val) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]{6,}$/;
    return regex.test(val);
  }, {
    message:
      "Password must contain at least 6 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character",
  });

export const registerUserSchema = z
  .object({
    email: z.string().email(),
    name: z.string().min(2, "Name must be at least 2 characters"),
    password: passwordValidation,
    confirmpassword: z.string(),
  })
  // to makesure the password and password confirm matches
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmpassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmpassword"],
      });
    }
  });
