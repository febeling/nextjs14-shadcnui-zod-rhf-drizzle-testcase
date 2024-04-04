pnpm create next-app

pnpm add react-hook-form drizzle-orm drizzle-zod zod @libsql/client

pnpm add -D drizzle-kit

mv ./drizzle.config.ts ...

pnpm dlx shadcn-ui@latest init
pnpm dlx shadcn-ui@latest add form input

npx drizzle-kit push:sqlite

---

add user list
add New form
add submit and createUser action
