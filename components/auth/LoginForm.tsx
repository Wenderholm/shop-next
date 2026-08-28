"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginFormSchema, type LoginFormData } from "@/schemas/login.schema";
import CheckIcon from "../icons/Check";

const inputBaseClass =
  "mt-4 w-full rounded-[6px] border bg-[#252525] px-5 py-[14px] text-base text-white outline-none transition placeholder:text-[#9b9b9b]";

const inputStateClass = (hasError: boolean) =>
  hasError
    ? "border-red-500 focus:border-red-500"
    : "border-[#4a4f5f] focus:border-[#f29145]";

const labelClass = "text-[18px] leading-[28px] font-medium text-[#FCFCFC]";

const errorClass = "mt-2 text-sm text-[#ff6b6b]";

export default function LoginForm() {
  const router = useRouter();

  const [step, setStep] = useState<"email" | "password">("email");

  const [submitError, setSubmitError] = useState<string | null>(null);

  const [isMarked, setIsMarked] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  });

  const handleEmailSubmit = async (data: LoginFormData) => {
    setSubmitError(null);

    const response = await fetch("/api/auth/check-email", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email: data.email,
      }),
    });

    const result = await response.json();

    if (!result.exists) {
      setSubmitError("User with this email does not exist");

      return;
    }

    setStep("password");
  };

  const handlePasswordSubmit = async (data: LoginFormData) => {
    setSubmitError(null);

    if (!data.password) {
      setError("password", {
        type: "manual",
        message: "Password is required",
      });

      return;
    }

    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (result?.error) {
      setSubmitError("Invalid password");

      return;
    }

    router.replace("/?login=success");
    router.refresh();
  };

  const onSubmit = async (data: LoginFormData) => {
    if (step === "email") {
      await handleEmailSubmit(data);

      return;
    }

    await handlePasswordSubmit(data);
  };

  return (
    <div className="w-full max-w-110 mx-auto">
      {/* LOGO */}
      <div className="mt-20 mb-8 text-center text-[40px] font-bold leading-none tracking-[-0.04em] text-white">
        <span className="text-orange">Nexus</span>
        <span>Hub</span>
      </div>

      <div className="rounded-2xl mb-20 border border-[#383B42] bg-[#262626] p-6 text-white sm:px-7">
        <h1 className="text-[24px] leading-[36px] font-medium tracking-[-0.01em] text-[#FCFCFC] border-b border-[#383B42] pb-5">
          {step === "email" ? "Sign In" : "Enter Password"}
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="mt-8 space-y-7"
        >
          {/* BŁĄD Z API / NEXTAUTH */}
          {submitError && (
            <p className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-[#ff8b8b]">
              {submitError}
            </p>
          )}

          {/* EMAIL */}
          {step === "email" && (
            <div>
              <label htmlFor="email" className={labelClass}>
                Email
              </label>

              <input
                id="email"
                type="email"
                placeholder="Your email"
                className={`${inputBaseClass} ${inputStateClass(
                  Boolean(errors.email),
                )}`}
                {...register("email")}
              />

              {errors.email && (
                <p className={errorClass}>{errors.email.message}</p>
              )}
            </div>
          )}

          {/* PASSWORD */}
          {step === "password" && (
            <div>
              <label htmlFor="password" className={labelClass}>
                Password
              </label>

              <input
                id="password"
                type="password"
                placeholder="Password"
                className={`${inputBaseClass} ${inputStateClass(
                  Boolean(errors.password),
                )}`}
                {...register("password")}
              />

              {errors.password && (
                <p className={errorClass}>{errors.password.message}</p>
              )}
            </div>
          )}

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-orange px-4 py-[14px] text-[16px] font-medium text-[#1d1d1d] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting
              ? "Loading..."
              : step === "email"
                ? "Continue"
                : "Login"}
          </button>

          {/* POWRÓT */}
          {step === "password" && (
            <button
              type="button"
              onClick={() => setIsMarked(!isMarked)}
              className="flex justify-between items-center w-full"
            >
              <div className="flex gap-3">
                <div
                  className={`flex h-[26px] w-[26px] items-center justify-center rounded-[4px] border transition ${
                    isMarked
                      ? "border-orange bg-orange"
                      : "border-[#4a4f5f] bg-transparent"
                  }`}
                >
                  {isMarked && (
                    <CheckIcon className="h-6.5 w-6.5" color="#262626" />
                  )}
                </div>

                <div className="text-[#E7E7E7] text-[16px] leading-6.5 font-normal">
                  Save password
                </div>
              </div>
              <div className="text-[#E7E7E7] text-[16px] leading-6.5 font-medium ">
                Forgot your password?
              </div>
            </button>
          )}

          {/* REJESTRACJA */}
          <p className=" text-[16px] text-[#E7E7E7]">
            Don&apos;t have an account? <Link href="/register">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
