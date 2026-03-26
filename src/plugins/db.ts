import fp from "fastify-plugin";
import type { FastifyInstance, FastifyPluginAsync } from "fastify";
import { db } from "../db/index.js";

declare module "fastify" {
  interface FastifyInstance {
    db: typeof db;
  }
}

const dbPlugin: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.decorate("db", db);
};
export default fp(dbPlugin);
