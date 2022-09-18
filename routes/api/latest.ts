import { HandlerContext } from "$fresh/server.ts";
import { createClient } from "supabase";
import { Database } from "../../lib/database.types.ts";

const client = createClient<Database>(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_ANON_KEY")!,
);

export const handler = async (
  _req: Request,
  _ctx: HandlerContext,
): Promise<Response> => {
  const { data, error } = await client.from("pages").select("title,id").order(
    "updated",
    { ascending: false },
  ).limit(20);
  if (data) {
    return new Response(JSON.stringify(data));
  }
  console.log(error);
  return _ctx.renderNotFound();
};
