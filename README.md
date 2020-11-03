This project aims to test full integration between NextJS & Prisma with a PostgreSQL database.

## Enviromental variables setup

This project makes use of a single _.env.local_ file in the root directory, so in order to work the [dotenv CLI](https://www.npmjs.com/package/dotenv-cli) can be used to overwrite the path when running Prisma CLI actions (Introspect, Generate, Studio).

The _package.json_ file has the following scripts configured to facilitate the Prisma workflow.

`npm run prisma:introspect`

`npm run prisma:generate`

`npm run prisma:studio`

## Deploy on Vercel

A Postinstall script is configured to generate the files necessary for the operation of the Prisma client during Vercel deployment.

`"postinstall": "prisma generate"`
