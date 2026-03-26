import fp from "fastify-plugin";
import { ZodError } from "zod";
import { formatZodError } from "../utils/format-zod-error.js";

export default fp(async (app) => {
  app.setErrorHandler((error, request, reply) => {
    if (error instanceof ZodError) {
      const formattedErrors = formatZodError(error);
      return reply.status(400).send({
        success: false,
        message:
          "Some of the information you provided is invalid. Please review the details below and correct the highlighted fields.",
        errors: Array.isArray(formattedErrors)
          ? formattedErrors.map((err) => ({
              field: err.path?.join(".") || "unknown",
              message: err.message,
            }))
          : formattedErrors,
      });
    }

    if ((error as any).validation) {
      const validationErrors = (error as any).validation;
      return reply.status(400).send({
        success: false,
        message:
          "Your request contains invalid data. Please check the details and resubmit.",
        errors: Array.isArray(validationErrors)
          ? validationErrors.map((err) => ({
              field: err.dataPath || err.instancePath || err.field || "unknown",
              message: err.message || "Invalid value",
            }))
          : validationErrors,
      });
    }

    request.log.error(error);

    return reply.status(500).send({
      success: false,
      message:
        "An unexpected error occurred on the server. Please try again later or contact support if the problem persists.",
    });
  });
});
