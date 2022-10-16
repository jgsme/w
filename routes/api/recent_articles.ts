import { HandlerContext } from "$fresh/server.ts";
import { recentArticles } from "../../lib/recentArticles.ts";

export const handler = async (
  _req: Request,
  _ctx: HandlerContext,
): Promise<Response> => {
  const { data, error } = await recentArticles();
  if (data) {
    return new Response(JSON.stringify(data));
  }
  console.log(error);
  return _ctx.renderNotFound();
};
