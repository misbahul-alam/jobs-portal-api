import type { FastifyInstance } from "fastify";
import { jwtConfig } from "../config/jwt.js";

export const generateAccessToken = (
  app: FastifyInstance,
  userId: string,
  role: string,
): string => {
  const token = app.jwt.sign(
    { userId, role, type: "access" },
    { expiresIn: jwtConfig.access_token_expire_in },
  );
  return token;
};

export const generateRefreshToken = (
  app: FastifyInstance,
  userId: string,
  role: string,
): string => {
  const token = app.jwt.sign(
    { userId, role, type: "refresh" },
    { expiresIn: jwtConfig.refresh_token_expire_in },
  );
  return token;
};
