import { client } from "./getSupabaseClient.ts";

export const recentArticles = async () => {
  return await client.rpc("recent_articles");
};
