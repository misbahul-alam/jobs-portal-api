import { pgTable, uuid, text, timestamp, index } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { jobs } from "./jobs.js";
import { users } from "./users.js";

export const companies = pgTable(
  "companies",
  {
    id: uuid("id").primaryKey().defaultRandom(),

    ownerId: uuid("owner_id").references(() => users.id, {
      onDelete: "set null",
    }),

    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),

    description: text("description"),
    website: text("website"),

    logoUrl: text("logo_url"),
    location: text("location"),
    industry: text("industry"),
    size: text("size"),

    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),

    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (t) => ({
    ownerIdx: index("companies_owner_id_idx").on(t.ownerId),
  }),
);

export const companiesRelations = relations(companies, ({ many, one }) => ({
  jobs: many(jobs),

  owner: one(users, {
    fields: [companies.ownerId],
    references: [users.id],
  }),
}));
