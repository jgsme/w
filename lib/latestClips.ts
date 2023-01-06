import { client } from "./getSupabaseClient.ts";

export const latsetClips = async (p = 0) => {
  return await client.rpc("latest_clips", {
    offset_arg: p * 20,
    limit_arg: (p + 1) * 20,
  });
};
