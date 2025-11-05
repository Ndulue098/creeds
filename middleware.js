import { decodeJwt } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export default async function middleware(request) {
  const cookieStore = await cookies();
  const jwtToken = cookieStore.get("firebaseAuthToken")?.value;
  const url = request.nextUrl;

  const isAuthPage=url.pathname.startsWith("/login")||url.pathname.startsWith("/register")
  const isAdminPage=url.pathname.startsWith("/admin-dashboard")

  if (request.method === "POST") {
    return NextResponse.next();
  }

  // logout user can access the page
  if (!jwtToken){
    if(isAuthPage) return NextResponse.next()
    if(isAdminPage) return NextResponse.redirect(new URL("/login?msg=unauthorized", request.url))
    
    return NextResponse.next()
  }

  // if (!jwtToken && (isAuthPage)) {
  //   return NextResponse.next();
  // }

  // login user can't access the login page
  // if (jwtToken && (isAuthPage)) {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }
  
  let decodedToken;
  if (jwtToken) {
    try {
      decodedToken = decodeJwt(jwtToken);
    } catch {
      // this runs if decoded token fails
    const res = NextResponse.redirect(new URL("/login?msg=invalid_token", request.url));
    res.cookies.delete("firebaseAuthToken");
    return res;
  }
  }

  // 3️⃣ Check for expiration
  if (decodedToken.exp * 1000 < Date.now()) {
  const res = NextResponse.redirect(new URL("/?msg=session_expired", request.url));
  res.cookies.delete("firebaseAuthToken");
  return res;
}

  if (isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const isAdmin = decodedToken.admin === true; // this relies on your custom claim
  // no decoded token and u trying to access admin page
  if (isAdminPage && !isAdmin) {
    return NextResponse.redirect(new URL("/?msg=not_admin", request.url));
  }

 

  return NextResponse.next();
}

export const config = {
  matcher: ["/login",
            "/register",
            "/admin-dashboard",
            "/admin-dashboard/:path*",
  ], 
};
