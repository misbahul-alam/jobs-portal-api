import type { FastifyInstance, FastifyPluginOptions } from "fastify";

export default async function authRoutes(
  app: FastifyInstance,
  options: FastifyPluginOptions,
) {
  app.get("/me", { preHandler: [app.authenticate] }, async (req, reply) => {
    const user = req.url;
    reply.send({ user });
  });
}
