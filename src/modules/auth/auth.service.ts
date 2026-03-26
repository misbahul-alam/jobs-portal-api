import type { FastifyInstance } from "fastify";
import { users } from "../../db/schema/users.js";

export const findUserByEmail = async (app: FastifyInstance, email: string) => {
  const user = await app.db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, email),
  });
  return user;
};

export const findUserById = async (app: FastifyInstance, id: string) => {
  const user = await app.db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, id),
  });
  return user;
};

export const createUser = async (
  app: FastifyInstance,
  data: {
    name: string;
    email: string;
    password: string;
    headline?: string;
    location?: string;
    role?: "job_seeker" | "recruiter";
  },
) => {
  const user = await app.db.insert(users).values(data).returning();
  return user;
};

export const verifyRefreshToken = async (
  app: FastifyInstance,
  token: string,
) => {
  const payload = app.jwt.verify<{
    type: "refresh" | "access";
    userId: string;
    role: string;
  }>(token);

  if (payload.type !== "refresh") {
    throw new Error("Invalid token type");
  }

  return payload;
};
