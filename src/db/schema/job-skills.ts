import { pgTable, uuid, boolean, primaryKey } from "drizzle-orm/pg-core";
import { jobs } from "./jobs.js";
import { skills } from "./skills.js";

export const jobSkills = pgTable(
  "job_skills",
  {
    jobId: uuid("job_id")
      .notNull()
      .references(() => jobs.id, { onDelete: "cascade" }),
    skillId: uuid("skill_id")
      .notNull()
      .references(() => skills.id, { onDelete: "cascade" }),
    isRequired: boolean("is_required").default(false),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.jobId, t.skillId] }),
  }),
);
