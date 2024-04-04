import { Button } from "@/components/ui/button";
import { getUsers } from "./actions";
import Link from "next/link";

export default async function Home() {
  const users = await getUsers();

  return (
    <main className="min-h-screen p-8">
      <h1>Users</h1>
      <div className="py-4">
        {users.map(user => {
          return (
            <div key={user.id} className="my-2">
              {user.name} - {user.email}
            </div>
          );
        })}
      </div>

      <Button variant={"outline"}>
        <Link href={"/new"}>New</Link>
      </Button>
    </main>
  );
}
