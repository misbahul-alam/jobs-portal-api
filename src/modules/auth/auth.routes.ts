import type { FastifyInstance, FastifyPluginOptions } from "fastify";
import {
  loginSchema,
  refreshTokenSchema,
  registerSchema,
} from "./auth.schema.js";
import * as controller from "./auth.controller.js";

export default async function authRoutes(
  app: FastifyInstance,
  options: FastifyPluginOptions,
) {
  app.post(
    "/login",
    {
      schema: {
        body: loginSchema,
      },
    },
    controller.login,
  );

  app.post(
    "/register",
    {
      schema: {
        body: registerSchema,
      },
    },
    controller.register,
  );
  app.get("/me", { preHandler: [app.authenticate] }, controller.me);
  app.post(
    "/refresh-token",
    {
      schema: {
        body: refreshTokenSchema,
      },
    },
    controller.refreshToken,
  );
}
