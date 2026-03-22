import Fastify from "fastify";
import cors from "@fastify/cors";
import rateLimit from "@fastify/rate-limit";
import { loggerConfig } from "@/config";
export function buildApp() {
  const app = Fastify({ logger: loggerConfig });

  app.register(cors, {
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  });

  app.register(rateLimit, {
    max: 100,
    timeWindow: "1 minute",
  });

  return app;
}
