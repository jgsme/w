import { createClient } from "supabase";
import { Database } from "./database.types.ts";

const client = createClient<Database>(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_ANON_KEY")!,
);

export const recentArticles = async () => {
  return await client.rpc("recent_articles");
};
