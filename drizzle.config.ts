import type { Config } from "drizzle-kit";

export default {
  schema: "./src/lib/schema.ts",
  out: "./src/migrations",
  driver: "libsql", // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
  dbCredentials: {
    url: "file:./db.sqlite",
  },
  verbose: true,
  strict: true,
} satisfies Config;
