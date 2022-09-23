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
  const { data, error } = await client.rpc("latest_articles", {
    offset_arg: 0,
    limit_arg: 20,
  });
  if (data) {
    return new Response(JSON.stringify(data));
  }
  console.log(error);
  return _ctx.renderNotFound();
};
