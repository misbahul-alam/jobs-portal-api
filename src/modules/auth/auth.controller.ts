import type { FastifyReply, FastifyRequest } from "fastify";
import type {
  LoginSchemaType,
  RefreshTokenSchemaType,
  RegisterSchemaType,
} from "./auth.schema.js";
import {
  createUser,
  findUserByEmail,
  findUserById,
  verifyRefreshToken,
} from "./auth.service.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/generate-token.js";
import { comparePassword, hashPassword } from "../../utils/password.js";

export const register = async (req: FastifyRequest, reply: FastifyReply) => {
  const { name, email, role, headline, location, password, confirm_password } =
    req.body as RegisterSchemaType;
  if (password !== confirm_password) {
    return reply
      .status(400)
      .send({ message: "Password and confirm password do not match" });
  }

  const existingUser = await findUserByEmail(req.server, email);
  if (existingUser) {
    return reply.status(400).send({ message: "Email already exists" });
  }

  const newUser = await createUser(req.server, {
    name,
    email,
    password: hashPassword(password),
    headline,
    location,
    role,
  });

  if (!newUser) {
    return reply.status(500).send({ message: "Failed to create user" });
  }

  reply
    .status(201)
    .send({ message: "User registered successfully", user: newUser });
};

export const login = async (req: FastifyRequest, reply: FastifyReply) => {
  const { email, password } = req.body as LoginSchemaType;
  const user = await findUserByEmail(req.server, email);

  if (!user) {
    return reply.status(401).send({ message: "Invalid email or password" });
  }

  if (!comparePassword(password, user.password)) {
    return reply.status(401).send({ message: "Invalid email or password" });
  }

  const access_token = generateAccessToken(req.server, user.id, user.role);
  const refresh_token = generateRefreshToken(req.server, user.id, user.role);

  const token = {
    message: "Login successful",
    access_token,
    refresh_token,
    type: "Bearer",
  };

  reply.send({ token });
};

export const me = async (req: FastifyRequest, reply: FastifyReply) => {
  const user = await findUserById(req.server, req.user.userId);

  reply.send({ ...user, ...{ password: undefined } });
};

export const refreshToken = async (
  req: FastifyRequest,
  reply: FastifyReply,
) => {
  const { refresh_token } = req.body as RefreshTokenSchemaType;
  try {
    const payload = await verifyRefreshToken(req.server, refresh_token);

    if (!payload) {
      return reply.status(401).send({ message: "Invalid refresh token" });
    }
    const access_token = generateAccessToken(
      req.server,
      payload.userId,
      payload.role,
    );
    return {
      message: "Token refreshed successfully",
      status: "success",
      access_token,
      type: "Bearer",
    };
  } catch (err) {
    return reply.status(401).send({ message: "Invalid refresh token" });
  }
};
