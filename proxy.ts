import { NextResponse } from "next/server";

export default function proxy(req: Request) {
  const country = req.headers.get("x-vercel-ip-country");

  if (country === "GB") {
    return NextResponse.rewrite(new URL("/blocked", req.url));
  }

  return;
}

export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico).*)",
};
