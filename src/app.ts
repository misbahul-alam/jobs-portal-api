import Fastify from "fastify";
import cors from "@fastify/cors";
import rateLimit from "@fastify/rate-limit";
import { loggerConfig } from "./config/logger.js";
import jwtPlugin from "./plugins/jwt.js";
import dbPlugin from "./plugins/db.js";
import authRoutes from "./modules/auth/auth.routes.js";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import errorHandler from "./plugins/error-handler.js";

export function buildApp() {
  const app = Fastify({
    logger: loggerConfig,
  }).withTypeProvider<ZodTypeProvider>();

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  app.register(cors, {
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  });

  app.register(jwtPlugin);
  app.register(dbPlugin);
  app.register(errorHandler);

  app.register(rateLimit, {
    max: 100,
    timeWindow: "1 minute",
  });

  app.register(authRoutes, { prefix: "/api/v1/auth" });

  return app;
}
