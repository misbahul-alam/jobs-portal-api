import {
  pgTable,
  uuid,
  text,
  timestamp,
  index,
  boolean,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { resumes } from "./resumes.js";
import { applications } from "./applications.js";
import { savedJobs } from "./saved-jobs.js";
import { userRoleEnum } from "./enums.js";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name").notNull(),
  headline: text("headline"),
  location: text("location"),
  avatarUrl: text("avatar_url"),
  role: userRoleEnum("role").notNull().default("job_seeker"),
  isEmailVerified: boolean("is_email_verified").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const usersRelations = relations(users, ({ many }) => ({
  resumes: many(resumes),
  applications: many(applications),
  savedJobs: many(savedJobs),
}));
