import { createClient } from "supabase";
import { Database } from "./database.types.ts";

const client = createClient<Database>(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_ANON_KEY")!,
);

export const latsetArticles = async (p = 0) => {
  return await client.rpc("latest_articles", {
    offset_arg: p * 20,
    limit_arg: (p + 1) * 20,
  });
};
