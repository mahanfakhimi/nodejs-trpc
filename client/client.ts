import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../server/server";

const main = async () => {
  const client = createTRPCProxyClient<AppRouter>({
    links: [
      httpBatchLink({
        url: "http://localhost:3000/api/trpc",
        maxURLLength: 2083,
      }),
    ],
  });

  const res = await client.greeting.query({ name: "node.js" });

  console.log(res.msg);
};

main();
