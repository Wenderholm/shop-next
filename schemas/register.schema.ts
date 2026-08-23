import { z } from "zod";

export const registerFormSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),

    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),

    password: z
      .string()
      .min(8, "Password must have at least 8 characters")
      .regex(/[A-Z]/, "Password must include at least 1 upper case letter")
      .regex(/[a-z]/, "Password must include at least 1 lower case letter")
      .regex(/[0-9]/, "Password must include at least 1 number"),

    confirmPassword: z.string().min(1, "Confirm password is required"),

    address: z.string().min(1, "Address is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerFormSchema>;
