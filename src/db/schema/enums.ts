import { pgEnum } from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", ["job_seeker", "recruiter", "admin"]);
export const jobTypeEnum = pgEnum("job_type", [
    "full_time",
    "part_time",
    "contract",
    "internship",
    "freelance",
]);
export const experienceLevelEnum = pgEnum("experience_level", [
    "entry",
    "mid",
    "senior",
    "lead",
    "executive",
]);
export const applicationStatusEnum = pgEnum("application_status", [
    "applied",
    "reviewing",
    "shortlisted",
    "interviewing",
    "offered",
    "rejected",
    "withdrawn",
]);