"use server";

import db from "@/lib/db";
import { users, User } from "@/lib/schema";
import { revalidatePath } from "next/cache";

export const getUsers = async () => {
  return await db.select().from(users);
};

export const createJob = async (values: User) => {
  await db.insert(users).values(values);

  revalidatePath("/jobs");
};
