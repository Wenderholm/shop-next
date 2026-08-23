import { useState } from "react";
import { RegisterFormData } from "@/schemas/register.schema";

export function useRegister() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const registerUser = async (data: RegisterFormData) => {
    setSubmitError(null);

    const response = await fetch("/api/auth/register", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        firstName: data.firstName,
        email: data.email,
        password: data.password,
        address: data.address,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      setSubmitError(result.message ?? "Registration failed");

      return false;
    }

    setIsRegistered(true);

    return true;
  };

  return {
    registerUser,
    isRegistered,
    submitError,
  };
}
