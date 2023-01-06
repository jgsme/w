import { latsetArticles } from "../../lib/latestArticles.ts";

export default async function handler(req: Request) {
  const url = new URL(req.url);
  const p = parseInt(url.searchParams.get("p") ?? "0");
  const { data, error } = await latsetArticles(p);
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
