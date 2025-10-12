import z from "zod";
import { passwordValidation } from "./passwordValidator";

export const LoginFormSchema=z.object({
    email:z.string().email(),
    password:passwordValidation
})