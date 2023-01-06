import type { APIRoute } from "astro";
import { latsetArticles } from "lib/latestArticles";

export const get: APIRoute = async ({}) => {
  const articles = await latsetArticles();
  return {
    body: JSON.stringify(articles),
  };
};
