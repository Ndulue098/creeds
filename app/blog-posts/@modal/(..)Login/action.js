"use server"

import { revalidatePath } from "next/cache"

export default async function LoginValidate() {
    revalidatePath("/blog-posts")
}

