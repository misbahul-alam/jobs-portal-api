import { ZodError } from "zod";

export function formatZodError(error: ZodError) {
  const fields: Record<string, string> = {};

  for (const issue of error.issues) {
    const key = issue.path.join(".");
    if (!fields[key]) {
      fields[key] = issue.message;
    }
  }

  return fields;
}
