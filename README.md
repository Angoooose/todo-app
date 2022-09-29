# todo-app

A dead simple task tracking app with some snazzy animations.

## Tech Stack

- [NextJS](https://nextjs.org/) / TypeScript
- [TailwindCSS](https://tailwindcss.com/)
- [Prisma](https://www.prisma.io/) / PostgreSQL
- [Framer Motion](https://www.framer.com/motion/)
- [SWR](https://swr.vercel.app/)

## To use

A live demo can be found at: https://todo.angoose.dev/. Alternatively, you can run it locally.

## Running Locally

### Requirements

- NodeJS and NPM
- PostgreSQL database

### Steps

1. Create a `.env` file with the following contents, but with your Postgres DB credentials as `DATABASE_URL`:

```
NEXTAUTH_SECRET=super_secret
DATABASE_URL=postgresql://postgres:docker@localhost:5433
```

2. Run `npm i` to install needed packages.

3. Execute `npm run dev` to start the app in development mode. It should open at http://localhost:3000/.
