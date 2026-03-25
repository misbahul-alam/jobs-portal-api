import { pgTable, uuid, text, timestamp, index } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { users } from "./users.js";

export const resumes = pgTable(
  "resumes",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    fileUrl: text("file_url").notNull(),
  },
  (t) => ({
    userIdx: index("resumes_user_id_idx").on(t.userId),
  }),
);

export const resumesRelations = relations(resumes, ({ one }) => ({
  user: one(users, {
    fields: [resumes.userId],
    references: [users.id],
  }),
}));
