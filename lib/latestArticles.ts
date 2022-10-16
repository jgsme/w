import { client } from "./getSupabaseClient.ts";

export const latsetArticles = async (p = 0) => {
  return await client.rpc("latest_articles", {
    offset_arg: p * 20,
    limit_arg: (p + 1) * 20,
  });
};
