import express from "express";
import * as trpc from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import z from "zod";

const t = trpc.initTRPC.create();

export const appRouter = t.router({
  greeting: t.procedure
    .input(z.object({ name: z.string().optional() }))
    .query(({ input }) => {
      return { msg: `Hello, ${input.name ?? "World"}` };
    }),
});

export type AppRouter = typeof appRouter;

const createContext = ({}: trpcExpress.CreateExpressContextOptions) => ({});

const app = express();

app.use(
  "/api/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

const PORT = 3000;

app.listen(PORT, () =>
  console.log(`Server is running at http://localhost:${PORT}`)
);
