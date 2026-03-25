import { env } from "./env.js";

export const loggerConfig = {
  level: env.NODE_ENV === "production" ? "info" : "debug",
};
