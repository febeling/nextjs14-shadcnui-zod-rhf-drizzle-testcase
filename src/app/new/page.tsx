"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InsertUserSchema, User } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { createUser } from "../actions";
import { redirect } from "next/navigation";

export default function NewUser() {
  const [, startTransition] = useTransition();

  const user: User = { name: "" };

  const form = useForm<User>({
    resolver: zodResolver(InsertUserSchema),
    defaultValues: {
      name: "",
      email: "",
    },
    values: user,
  });

  function onSubmit(values: User) {
    startTransition(async () => {
      await createUser(values);
      console.log(`✅ User created`);
      redirect("/");
    });
  }

  return (
    <main className="min-h-screen p-8">
      <h1>New User</h1>
      <div className="py-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="pb-2">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="pb-2">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value} // <- How to fix this warning?
                        placeholder="Your email here"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="py-5 flow flex-row items-end justify-items-end">
                <Button type="submit" className="mr-1">
                  Submit
                </Button>
                <Button variant={"outline"}>Cancel</Button>
              </div>
            </div>
          </form>
        </Form>
      </div>

      <Button variant={"outline"}>
        <Link href={"/"}>Back</Link>
      </Button>
    </main>
  );
}
