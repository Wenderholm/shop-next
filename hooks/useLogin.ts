"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginFormSchema, type LoginFormData } from "@/schemas/login.schema";

export function useLogin() {
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

  const toggleSavePassword = () => {
    setIsMarked((current) => !current);
  };

  return {
    step,
    submitError,
    isMarked,

    register,
    handleSubmit,
    errors,
    isSubmitting,

    onSubmit,
    toggleSavePassword,
  };
}
