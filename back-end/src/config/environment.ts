import dotenv from "dotenv";
import { z } from "zod";

// Load environment variables
dotenv.config();

// Environment schema validation
const envSchema = z.object({
  // Server
  NODE_ENV: z
    .enum(["development", "production", "test", "local"])
    .default("development"),
  PORT: z.string().default("3000"),

  // Database
  DB_HOST: z.string(),
  DB_PORT: z.string().default("5432"),
  DB_NAME: z.string(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_ADMIN_NAME: z.string().default("postgres"),

  // Auth
  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string().default("24h"),

  // CORS
  CORS_ORIGIN: z.string().default("*"),
});

// Validate and transform environment variables
const env = envSchema.safeParse(process.env);

if (!env.success) {
  console.error("❌ Invalid environment variables:", env.error.format());
  throw new Error("Invalid environment variables");
}

// Export validated config
export const config = {
  // Server
  NODE_ENV: env.data.NODE_ENV,
  PORT: parseInt(env.data.PORT, 10),

  // Database
  DB_HOST: env.data.DB_HOST,
  DB_PORT: env.data.DB_PORT,
  DB_NAME: env.data.DB_NAME,
  DB_USER: env.data.DB_USER,
  DB_PASSWORD: env.data.DB_PASSWORD,
  DB_ADMIN_NAME: env.data.DB_ADMIN_NAME,

  // Auth
  JWT_SECRET: env.data.JWT_SECRET,
  JWT_EXPIRES_IN: env.data.JWT_EXPIRES_IN,

  // CORS
  CORS_ORIGIN: env.data.CORS_ORIGIN,
} as const;