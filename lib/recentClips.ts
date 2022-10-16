import { client } from "./getSupabaseClient.ts";

export const recentClips = async () => {
  return await client.rpc("recent_clips");
};
