import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const country = req.headers.get("x-vercel-ip-country");

  if (country === "GB") {
    return new NextResponse("Access denied", { status: 403 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico).*)",
};
