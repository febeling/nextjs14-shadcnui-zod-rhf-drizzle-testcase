# README

## Issue

Reproduce a problem with typesafe editing of model entities nullable text fields.

This app reproduces this problem in a somewhat minimal way. It's built using Nextjs 14, Drizzle ORM, Zod validations derived from schema, Shadcn/ui forms, react-hook-form for a minimal CRUD UI.

## Goal

The goal is typesafety from the UI to the database schema, while creating, validating, and editing database entries.

## Problem

The form fields in Shadcn-ui/react-hook-form don't allow null values. This isn't surprising, because text inputs can't represent them any different from empty strings. But this conflicts with what the database derived validation schema and types expect.

It results in type errors and plenty of empty strings in the database.

## What to look for?

This problem manifests itself in two ways; firstly this warning

```shell
npx tsc --noEmit
src/app/new/page.tsx:70:25 - error TS2322: Type 'string | null | undefined' is not assignable to type 'string | number | readonly string[] | undefined'.
  Type 'null' is not assignable to type 'string | number | readonly string[] | undefined'.

70                         value={field.value} // <-
                           ~~~~~

  node_modules/.pnpm/@types+react@18.2.74/node_modules/@types/react/index.d.ts:3332:9
    3332         value?: string | readonly string[] | number | undefined;
                 ~~~~~
    The expected type comes from property 'value' which is declared here on type 'IntrinsicAttributes & InputProps & RefAttributes<HTMLInputElement>'


Found 1 error in src/app/new/page.tsx:70
```

In short, for field `email` the user model has type `string | null | undefined` (derived from the db schema), while the form field can't handle the `null` and expects `string | readonly string[] | number | undefined` instead.

Secondly, in new records always containing empty string where there is no input.

## Are we on the right track?

Is it correct to have a nullable database column? Yes, usually we want nullable database columns for string fields in order to make queries simpler (e.g. `WHERE email IS NULL`).

## Workaround

There are workarounds. It is possible to change the code in line 70 (see above) to the follwing, and slience the warning:

```jsx
    value={field.value ?? ''}
```

That makes the typechecker happy and removes the warning. But it shouldn't be necessary when types are correct, and we go to all that length for them.

For the second part, it is possible to transform during validation by using the `refine` feature of Zod. This is the code to add to `src/lib/schema.ts`.

```ts
const nullifyEmptyString = (value: string) =>
  typeof value === "string" && value.length === 0 ? null : value;

export const InsertJobSchema = createInsertSchema(jobs, {
  description: schema =>
    schema.description.trim().transform(nullifyEmptyString),
});
```

The function `createInsertSchema` is imported from `drizzle-zod`, a package by the Drizzle team.

This transform would need to be applied to each field that is nullable.
