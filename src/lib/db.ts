import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "@/lib/schema";

const client = createClient({ url: "file:./db.sqlite" });

const db = drizzle(client, { schema });

export default db;
