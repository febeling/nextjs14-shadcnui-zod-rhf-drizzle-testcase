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
            <div key={user.id}>
              {user.name} - {user.email}{" "}
              <Button className="ml-2" size={"sm"}>
                Edit
              </Button>{" "}
              <Button size={"sm"}>Delete</Button>
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
