"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginFormSchema, type LoginFormData } from "@/schemas/login.schema";
import CheckIcon from "../icons/ui/CheckIcon";
// font-normal   tracking-normal
const inputBaseClass =
  "mt-4 w-full rounded-md border bg-input px-5 py-3.5 text-base leading-6.5 text-foreground outline-none transition placeholder:text-[#9b9b9b]";

const inputStateClass = (hasError: boolean) =>
  hasError
    ? "border-danger-strong focus:border-danger-strong"
    : "border-input-border focus:border-orange";

const labelClass = "text-lg font-medium leading-7 text-foreground";

const errorClass = "mt-2 text-sm text-danger";

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

      <div className="mb-20 rounded-2xl border border-border-default bg-surface p-6 text-white sm:px-7">
        <h1 className="border-b border-border-default pb-5 text-2xl font-medium leading-9 tracking-[-0.01em] text-foreground">
          {step === "email" ? "Sign In" : "Enter Password"}
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="mt-8 space-y-7"
        >
          {/* BŁĄD Z API / NEXTAUTH */}
          {submitError && (
            <p className="rounded-xl border border-danger px-4 py-3 text-sm text-danger">
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
            className="w-full rounded-md bg-orange px-4 py-3.5 text-base font-medium text-[#1d1d1d] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50"
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
                  className={`flex h-6.5 w-6.5 items-center justify-center rounded border transition ${
                    isMarked
                      ? "border-orange bg-orange"
                      : "border-input-border bg-transparent"
                  }`}
                >
                  {isMarked && (
                    <CheckIcon className="h-6.5 w-6.5" color="#262626" />
                  )}
                </div>

                <div className="text-base font-normal leading-6.5 text-foreground-soft">
                  Save password
                </div>
              </div>
              <div className="text-base font-medium leading-6.5 text-foreground-soft">
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
