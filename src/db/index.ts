import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool } from "@neondatabase/serverless";

// Initialize Neon connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Initialize drizzle with the pool
export const db = drizzle(pool);

// Re-export everything from the schema
export * from "../db/schema";
