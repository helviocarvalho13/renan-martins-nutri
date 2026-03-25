import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "@/lib/schema";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
  ssl: process.env.DATABASE_URL?.includes("sslmode=require") ? true : false,
});

export const db = drizzle(pool, { schema });
export * from "@/lib/schema";
