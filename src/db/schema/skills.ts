import { pgTable, uuid, text, uniqueIndex } from "drizzle-orm/pg-core";

export const skills = pgTable("skills", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    normalizedName: text("normalized_name").notNull().unique(), // lowercase, no accents, etc.
}, (t) => ({
    nameUnique: uniqueIndex("skills_name_unique").on(t.name),
}));