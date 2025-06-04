import { type NextRequest } from "next/server";
import { updateSession } from "./lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/transactions/:path*",
    "/budget/:path*",
    "/settings/:path*",
    "/((?!auth/callback|_next/static|_next/image|favicon.ico).*)",
  ],
}  