"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, SignUpFormData } from "@/lib/schema";
import { signUpWithEmail, loginWithGoogle } from "@/lib/auth/authentication";
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { FcGoogle } from "react-icons/fc";

export default function SignUpPage() {

  const [error, setError] = useState("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  async function handleEmailSignUp(data: SignUpFormData) {
    setError("");

    try {
      const { error } = await signUpWithEmail(data);
      if (error) setError(error.message);
      else router.replace("/dashboard");
    } catch (error) {
      console.error("An error occured during sign-up: ", error);
      setError("Something went wrong. Please try again later.");
    }
  }

  async function handleGoogleLogin() {
    setError("");

    try {
      const { error } = await loginWithGoogle();
      if (error) setError(error.message);
    } catch (error) {
      console.error("An error occured during login: ", error);
      setError("We couldn’t sign you in with Google. Please try again later or register with your email instead.");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl md:text-4xl font-semibold text-emerald-500 mb-10 mt-8 text-center">Create an account</h1>

      {/* Google Login Button */}
      
      <Button 
        type="button"
        variant="outline"
        className="w-4/7 max-w-lg h-12 mb-6 border-emerald-500 text-stone-500 text-base flex items-center justify-center gap-4 hover:cursor-pointer"
        disabled={isSubmitting}
        onClick={handleGoogleLogin}
      >
        <FcGoogle /> Continue with Google
      </Button>

      {/* OR separator */}
      <div className="w-4/5 max-w-lg flex items-center my-6">
        <Separator className="flex-1" />
        <span className="mx-4 text-gray-400">or</span>
        <Separator className="flex-1" />
      </div>

      {/* Sign Up Form */}
      <form onSubmit={handleSubmit(handleEmailSignUp)} className="w-4/7 max-w-lg flex flex-col gap-4">

        <div className="space-y-2">
          <Input id="name" type="text" placeholder="Full Name" className="h-12" {...register("name")} />
          {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
        </div>

        <div className="space-y-2">
          <Input id="email" type="email" placeholder="Email" className="h-12" {...register("email")} />
          {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <Input id="password" type="password" placeholder="Password" className="h-12" {...register("password")} />
          {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
        </div>

        <div className="space-y-2">
          <Input id="confirmPassword" type="password" placeholder="Confirm Password" className="h-12" {...register("confirmPassword")} />
          {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>}
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full max-w-lg h-12 mt-2 bg-emerald-500 hover:bg-emerald-400 text-white text-base hover:cursor-pointer">
          {isSubmitting ? "Submitting..." : "Create Account"}
        </Button>
      </form>

      <div className="w-full max-w-lg text-center mt-4">
        <a href="/login" className="text-emerald-500 underline text-sm">Already have an account? Sign in</a>
      </div>

      {error && <div className="text-red-500 text-sm mt-4 text-center w-full max-w-lg">{error}</div>}
      
    </div>
  )
}
