import { decodeJwt } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export default async function middleware(request) {
  if (request.method === "POST") {
    return NextResponse.next();
  }

  const cookieStore = await cookies();
  const jwtToken = cookieStore.get("firebaseAuthToken")?.value;

  let decodedToken;
  if (jwtToken) {
    try {
      decodedToken = decodeJwt(jwtToken);
    } catch (error) {
      console.error("Invalid JWT:", error);
    }
  }

  // login user can access the page
  if (!jwtToken && request.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.next();
  }

  // login user can't access the page
  if (jwtToken && request.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

//   if (decodedToken && request.nextUrl.pathname.startsWith("/login")) {
//     return NextResponse.redirect(new URL("/", request.url));
//   }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login"],
};
