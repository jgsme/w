import { HandlerContext } from "$fresh/server.ts";
import { recentClips } from "../../lib/recentClips.ts";

export const handler = async (
  _req: Request,
  _ctx: HandlerContext,
): Promise<Response> => {
  const { data, error } = await recentClips();
  if (data) {
    return new Response(JSON.stringify(data));
  }
  console.log(error);
  return _ctx.renderNotFound();
};
