import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),

  password: z.string().optional(),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;
