import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { supabaseUrl, supabaseAnonKey } from "./config";

export async function getSupabaseServerClient() {
  const cookieStore = await cookies();
  
  return createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          // Optional: Supabase may call `setAll` to refresh session cookies.
          // This only works in Route Handlers or Server Actions — not in Server Components.
          // Safe to wrap in try/catch, especially if using middleware to refresh sessions.
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Ignored: We're likely in a Server Component where cookies can't be set.
            // Middleware should already be handling session refresh.
          }
        },
      }
    }
  )
}