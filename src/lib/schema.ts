import { index, integer, text, sqliteTable } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = sqliteTable(
  "users",
  {
    id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    name: text("name", { length: 256 }).notNull(),
    email: text("email", { length: 256 }),
  },
  users => ({
    emailIdx: index("email_idx").on(users.email),
  })
);

export const InsertUserSchema = createInsertSchema(users);

export type User = z.infer<typeof InsertUserSchema>;
