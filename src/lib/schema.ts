import { index, integer, text, sqliteTable } from "drizzle-orm/sqlite-core";

export const users = sqliteTable(
  "users",
  {
    id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    name: text("name", { length: 256 }).notNull(),
    email: text("email", { length: 256 }),
    bio: text("bio", { length: 1024 }),
  },
  users => ({
    emailIdx: index("email_idx").on(users.email),
  })
);
