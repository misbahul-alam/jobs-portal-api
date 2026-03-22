import { env } from "./env";

export const loggerConfig = {
    level: env.NODE_ENV === "production" ? "info" : "debug"
};