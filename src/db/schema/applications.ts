import {
  pgTable,
  uuid,
  text,
  timestamp,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { jobs } from "./jobs.js";
import { users } from "./users.js";
import { resumes } from "./resumes.js";
import { applicationStatusEnum } from "./enums.js";

export const applications = pgTable(
  "applications",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    jobId: uuid("job_id")
      .notNull()
      .references(() => jobs.id, { onDelete: "cascade" }),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    resumeId: uuid("resume_id").references(() => resumes.id, {
      onDelete: "set null",
    }), // optional
    status: applicationStatusEnum("status").notNull().default("applied"),
    coverLetter: text("cover_letter"),
    appliedAt: timestamp("applied_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (t) => ({
    jobUserUnique: uniqueIndex("job_applications_job_user_unique").on(
      t.jobId,
      t.userId,
    ),
    userId: index("applications_user_id_idx").on(t.userId),
    jobId: index("applications_job_id_idx").on(t.jobId),
    statusIdx: index("job_applications_status_idx").on(t.status),
  }),
);

export const applicationsRelations = relations(applications, ({ one }) => ({
  job: one(jobs, { fields: [applications.jobId], references: [jobs.id] }),
  user: one(users, { fields: [applications.userId], references: [users.id] }),
  resume: one(resumes, {
    fields: [applications.resumeId],
    references: [resumes.id],
  }),
}));
