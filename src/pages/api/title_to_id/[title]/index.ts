import type { APIRoute } from "astro";

export const GET: APIRoute<{ title: string }> = async ({ params }) => {
  const res = await fetch(
    `https://kbystk-w-api.deno.dev/title_to_id?title=${params.title}`,
  );
  const json = await res.json();
  if (json.ok) {
    if (json.payload.length > 0) {
      return new Response(
        JSON.stringify({ ok: true, payload: json.payload[0] }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
  }
  return new Response(JSON.stringify({ ok: false }), {
    status: 404,
    headers: { "Content-Type": "application/json" },
  });
};
