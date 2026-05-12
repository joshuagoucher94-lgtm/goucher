export default function middleware(req: Request) {
  const country = req.headers.get("x-vercel-ip-country");

  if (country === "GB") {
    return new Response("Access denied", { status: 403 });
  }

  return;
}

export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico).*)",
};
