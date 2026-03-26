import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { dbConfig } from "./../config/database.js";
import * as schema from "./schema/index.js";
const pool = new Pool({
  connectionString: dbConfig.url,
});

export const db = drizzle(pool, {
  schema,
});
