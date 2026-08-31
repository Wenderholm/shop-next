"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { registerFormSchema } from "@/schemas/register.schema";
import RegisterSuccess from "./RegisterSuccess";
import { useRegister } from "@/hooks/useRegister";
import { useState } from "react";
import ShowPasswordIcon from "../icons/ShowPasswordIcon";

type RegisterFormData = z.infer<typeof registerFormSchema>;

const inputBaseClass =
  " w-full leading-[26px] font-normal rounded-[6px] border bg-[#252525] outline-none px-5 py-[14px] text-base text-[#FCFCFC]  transition placeholder:text-[#9b9b9b]";

const inputStateClass = (hasError: boolean) =>
  hasError
    ? "border-[#DC2626] focus:border-[#DC2626]"
    : "border-[#4a4f5f] focus:border-[#f29145]";

const labelClass = "text-sm font-medium text-[#f3f3f3]";
const errorClass = "mt-2 text-[14px] text-[#F87171]";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  });

  const { registerUser, isRegistered, submitError } = useRegister();
  const [showPassword, setShowPassword] = useState(false);
  const onSubmit = async (data: RegisterFormData) => {
    await registerUser(data);
  };

  if (isRegistered) {
    return <RegisterSuccess />;
  }

  return (
    <div className="w-full max-w-110">
      <div className="mt-19.25 mb-8 text-center text-[40px] font-bold leading-none tracking-[-0.04em] text-white">
        <span className="text-orange">Nexus</span>
        <span>Hub</span>
      </div>

      <div className="rounded-2xl border border-[#343846] bg-[#222222] px-6 py-7 text-white shadow-[0_24px_80px_rgba(0,0,0,0.35)] sm:px-7">
        <h1 className="text-[2rem] font-semibold tracking-[-0.03em] text-[#f3f3f3]">
          Create Account
        </h1>

        <div className="mt-5 h-px w-full bg-[#30333d]" />

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="mt-8 space-y-7"
        >
          {submitError && (
            <p className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-[#ff8b8b]">
              {submitError}
            </p>
          )}

          <div>
            <label htmlFor="firstName" className={labelClass}>
              First Name
            </label>
            <div className="mt-3">
              <input
                id="firstName"
                placeholder="Your first name"
                className={`${inputBaseClass} ${inputStateClass(Boolean(errors.firstName))}`}
                {...register("firstName")}
              />
            </div>

            {errors.firstName && (
              <p className={errorClass}>{errors.firstName.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className={labelClass}>
              Email
            </label>
            <div className="mt-3">
              <input
                id="email"
                type="email"
                placeholder="Your Email"
                className={`${inputBaseClass} ${inputStateClass(Boolean(errors.email))}`}
                {...register("email")}
              />
            </div>
            {errors.email && (
              <p className={errorClass}>{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className={labelClass}>
              Password
            </label>
            <div className="relative mt-3">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className={`${inputBaseClass} ${inputStateClass(Boolean(errors.password))}`}
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-[#c4c4c4]"
              >
                {showPassword ? <ShowPasswordIcon /> : <ShowPasswordIcon />}
              </button>
            </div>
            <p
              className={`mt-2 text-sm ${errors.password ? "text-[#ff6b6b]" : "text-[#c4c4c4]"}`}
            >
              Password must be at least 8 characters and include at least 1
              upper case letter, 1 lower case letter and 1 number.
            </p>
          </div>

          <div>
            <label htmlFor="confirmPassword" className={labelClass}>
              Confirm Password
            </label>
            <div className="relative mt-3">
              <input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className={`${inputBaseClass} ${inputStateClass(Boolean(errors.confirmPassword))}`}
                {...register("confirmPassword")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-[#c4c4c4]"
              >
                {showPassword ? <ShowPasswordIcon /> : <ShowPasswordIcon />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className={errorClass}>{errors.confirmPassword.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="address" className={labelClass}>
              Country or region
            </label>
            <div className="mt-3">
              <select
                id="address"
                className={`${inputBaseClass} ${inputStateClass(Boolean(errors.address))} appearance-none pr-12`}
                {...register("address")}
              >
                <option value="">Select your country</option>
                <option value="Poland">Poland</option>
                <option value="Germany">Germany</option>
                <option value="France">France</option>
                <option value="Spain">Spain</option>
                <option value="Italy">Italy</option>
                <option value="Netherlands">Netherlands</option>
              </select>
            </div>
            {errors.address && (
              <p className={errorClass}>{errors.address.message}</p>
            )}
          </div>

          <label className="flex items-start gap-3 text-sm leading-6 text-[#d4d4d4]">
            <input
              type="checkbox"
              defaultChecked
              className="mt-1 h-5 w-5 shrink-0 accent-orange"
            />

            <span>
              By creating an account and check, you agree to the{" "}
              <span className="text-orange">Conditions of Use</span> and{" "}
              <span className="text-orange">Privacy Notice</span>.
            </span>
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-orange px-4 py-3 text-lg font-medium text-[#1d1d1d] transition hover:brightness-105"
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}
