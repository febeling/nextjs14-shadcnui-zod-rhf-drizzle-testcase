## Setup

pnpm dlx create next-app

pnpm add react-hook-form drizzle-orm drizzle-zod zod @libsql/client
pnpm add @hookform/resolvers

pnpm add -D drizzle-kit

mv ./drizzle.config.ts ...

pnpm dlx shadcn-ui@latest init
pnpm dlx shadcn-ui@latest add form input

npx drizzle-kit push:sqlite
