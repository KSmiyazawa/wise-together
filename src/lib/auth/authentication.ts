import { getSupabaseBrowserClient } from "../supabase/browser"; 
import { LoginFormData, SignUpFormData } from "@/lib/schema";

const supabase = getSupabaseBrowserClient();

export async function loginWithEmail(data: LoginFormData) {
  return await supabase.auth.signInWithPassword(data);
}

export async function loginWithGoogle() {
  return await supabase.auth.signInWithOAuth(
    { provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    });
}

export async function signUpWithEmail({ email, password, name }: SignUpFormData) {
  return await supabase.auth.signUp({ 
    email, 
    password,
    options: {
      data: {
        full_name: name,
      }
    }
  });
}

export async function signOut() {
  return await supabase.auth.signOut();
}