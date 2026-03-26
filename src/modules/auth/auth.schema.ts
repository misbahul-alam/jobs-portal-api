import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const registerSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  headline: z.string().optional(),
  location: z.string().optional(),
  role: z.enum(["job_seeker", "recruiter"]).default("job_seeker"),
  password: z.string(),
  confirm_password: z.string(),
});

export const refreshTokenSchema = z.object({
  refresh_token: z.string(),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
export type RegisterSchemaType = z.infer<typeof registerSchema>;
export type RefreshTokenSchemaType = z.infer<typeof refreshTokenSchema>;
