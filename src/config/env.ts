import dotenv from "dotenv";
import {z} from "zod";

dotenv.config()

const envSchema = z.object({
    NODE_ENV: z.enum(["development", "production"]).default("development"),
    PORT: z.string().default("5000"),
    DATABASE_URL: z.string(),
    JWT_SECRET: z.string(),
})

export const env = envSchema.parse(process.env);