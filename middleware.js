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

  // logout user can access the page
  if (!jwtToken && (
      request.nextUrl.pathname.startsWith("/login")||
      request.nextUrl.pathname.startsWith("/register"))) {
    return NextResponse.next();
  }

  // login user can't access the login page
  if (jwtToken && (
    request.nextUrl.pathname.startsWith("/login") ||
      request.nextUrl.pathname.startsWith("/register")
    )) {
    return NextResponse.redirect(new URL("/", request.url));
  }


   // checking is token will expire within the next 5min
    // redirect to this 
    // were we can take as much time to request another auth token, cause issuring a fetch request on middle ware take 1.5 sec
    // we will create a new api root responsible for fetching the we can take as long as we need to get the new auth token for the user
    // 
    if(decodedToken.exp && (decodedToken.exp-300) * 1000<Date.now()){
        return NextResponse.redirect(new URL(`/api/refresh-token?redirect=${encodeURIComponent(request.nextUrl.pathname)}`,request.url))
    } 


  if(!decodedToken && request.nextUrl.pathname.startsWith("/admin-dashboard")){
    return NextResponse.redirect(new URL("/",request.url))
  }
//   if (decodedToken && request.nextUrl.pathname.startsWith("/login")) {
//     return NextResponse.redirect(new URL("/", request.url));
//   }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login",
            "/register",
            "/admin-dashboard",
            "/admin-dashboard/:path*",
  ],
};
