import { latsetArticles } from "../../lib/latestArticles.ts";

export default async function handler(req: Request) {
  const articles = await latsetArticles();
  return new Response(JSON.stringify(articles), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
