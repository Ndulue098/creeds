"use server"

import { auth } from "@/firebase/Server";
import { registerUserSchema } from "@/validator/passwordValidator";

export async function registerUser(data){
     const validate = registerUserSchema.safeParse(data)
  if (!validate.success) {
    return {
      error: true,
      message: validate.error.issues[0]?.message || "an error occured",
    };
  }

   try {
    // 2. Attempt to create user

    await auth.createUser({
      displayName: data.name,
      email: data.email,
      password: data.password,
    });
    // 3. Return success
    return {
      error: false,
      message: "User registered successfully",
    };
  } catch (err) {    
    return {
      error: true,
      message: err.message || "could not register user",
    };
  }
}