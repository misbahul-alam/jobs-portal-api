// import fp from "fastify-plugin";
// import fastifyJwt from "@fastify/jwt";
// import { env } from "./../../config/env.js";
// import type { FastifyRequest, FastifyReply } from "fastify";

// export default fp(async (fastify) => {
//   fastify.register(fastifyJwt, { secret: env.JWT_SECRET });

//   // decorate request with user (typed via module augmentation below)
//   fastify.decorateRequest("user");

//   // reusable auth preHandler (no decorate() needed)
//   fastify.addHook(
//     "preHandler",
//     async (req: FastifyRequest, reply: FastifyReply) => {
//       // Only run when route opts-in (see route usage below)
//       if (!req.routeOptions.config.auth) return;

//       try {
//         await req.jwtVerify();
//       } catch {
//         return reply.code(401).send({ message: "Unauthorized" });
//       }
//     },
//   );
// });
