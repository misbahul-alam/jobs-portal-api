import fp from "fastify-plugin";
import fastifyJwt from "@fastify/jwt";
import { jwtConfig } from "./../config/jwt.js";
import type {
  FastifyInstance,
  FastifyPluginAsync,
  FastifyReply,
  FastifyRequest,
} from "fastify";

declare module "fastify" {
  interface FastifyInstance {
    authenticate: (req: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
}

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: {
      userId: string;
      role: string;
      type: "access" | "refresh";
    };
    user: {
      userId: string;
      role: string;
      type: "access" | "refresh";
    };
  }
}

const jwtPlugin: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.register(fastifyJwt, {
    secret: jwtConfig.secret,
  });

  fastify.decorate(
    "authenticate",
    async (req: FastifyRequest, reply: FastifyReply) => {
      try {
        await req.jwtVerify();

        if (req.user.type !== "access") {
          return reply
            .code(401)
            .send({ error: "Invalid token type, access token required" });
        }
      } catch (err) {
        reply.code(401).send({ error: "Unauthorized" });
      }
    },
  );
};

export default fp(jwtPlugin);
