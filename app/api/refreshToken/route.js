
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  const path = request.nextUrl.searchParams.get("redirect");

  if (!path) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const cookieStore = cookies();
  const refreshToken = cookieStore.get("firebaseAuthRefreshToken")?.value;

  if (!refreshToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // the key is the firebase api key
  try {
    const response = await fetch(
      "https://securetoken.googleapis.com/v1/token?key=AIzaSyDnuvgOFPv5FbwKt0IHp1HlOFSlHmXdkrk",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          grant_type: "refresh_token",
          refresh_token: refreshToken,
        }),
      }
    );

    const json = await response.json();
    const newToken = json.id_token;

    // Create redirect response and attach new cookie
    const res = NextResponse.redirect(new URL(path, request.url));
    res.cookies.set("firebaseAuthToken", newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    return res;
  } catch (err) {
    console.error("Error refreshing token:", err);
    return NextResponse.redirect(new URL("/", request.url));
  }
};
