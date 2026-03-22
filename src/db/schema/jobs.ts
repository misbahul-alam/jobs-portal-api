import {pgTable, uuid, text, integer, boolean, timestamp, index, date, check, varchar} from "drizzle-orm/pg-core";
import {sql} from "drizzle-orm"
import { companies } from "./companies";
import {experienceLevelEnum, jobTypeEnum} from "@/db/schema/enums";

export const jobs = pgTable("jobs", {
    id: uuid("id").primaryKey().defaultRandom(),
    companyId: uuid("company_id")
        .notNull()
        .references(() => companies.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    slug: text("slug").notNull().unique(),
    description: text("description").notNull(),
    jobType: jobTypeEnum("job_type").notNull().default("full_time"),
    experienceLevel: experienceLevelEnum("experience_level").notNull().default("entry"),
    minSalary: integer("min_salary"),
    maxSalary: integer("max_salary"),
    salaryCurrency: varchar("salary_currency",{length:10}).default("USD"),
    location: text("location"),
    isRemote: boolean("is_remote").notNull().default(false),
    isPublished: boolean("is_published").notNull().default(false),
    expiresAt: date("expires_at"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
        .notNull()
        .defaultNow()
        .$onUpdate(() => new Date()),
}, (t) => ({
    companyIdx: index("jobs_company_id_idx").on(t.companyId),
    publishedIdx: index("jobs_published_idx").on(t.isPublished, t.createdAt.desc()),
    locationIdx: index("jobs_location_idx").on(t.location),
    jobTypeIdx: index("jobs_job_type_idx").on(t.jobType),
    experienceLevel: index("jobs_experience_idx").on(t.experienceLevel),
    salaryCheck: check(
        "jobs_salary_check",
        sql`
        ${t.minSalary} IS NULL
        OR ${t.maxSalary} IS NULL
        OR ${t.minSalary} <= ${t.maxSalary}
      `
    ),}));