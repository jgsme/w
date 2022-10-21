import { Handlers, PageProps } from "$fresh/server.ts";
import { titlePurify } from "../lib/titlePurify.ts";
import { Head } from "$fresh/src/runtime/head.ts";
import { gyazoSrcset, isGyazoUrl } from "../lib/gyazo.ts";
import { latsetArticles } from "../lib/latestArticles.ts";
import { Layout } from "../components/Layout.tsx";

type Page = {
  id: string;
  title: string;
  created: string;
  image: string | null;
};

export const handler: Handlers<{ pages: Page[]; p: number }> = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    const p = parseInt(url.searchParams.get("p") ?? "0");
    const { data, error } = await latsetArticles(
      p,
    );
    if (data) {
      return ctx.render({
        pages: data,
        p,
      });
    }
    if (error) {
      console.log(error);
    }
    return ctx.render({
      pages: [],
      p,
    });
  },
};

export default function Home(
  { data: { pages, p } }: PageProps<{ pages: Page[]; p: number }>,
) {
  return (
    <Layout>
      <div class="max-w-[600px] mx-auto pb-[200px]">
        <Head>
          <title>I am Electrical machine</title>
        </Head>
        <ul>
          {pages.map((page) => (
            <li key={page.id} class="my-8">
              <a href={`/pages/${titlePurify(page.title)}`}>
                {page.image
                  ? isGyazoUrl(page.image)
                    ? (
                      <img
                        src={page.image}
                        srcset={gyazoSrcset(page.image)}
                        class="mb-2 rounded mx-auto"
                      >
                      </img>
                    )
                    : (
                      <img src={page.image} class="mb-2 rounded mx-auto">
                      </img>
                    )
                  : (
                    <div class="h-[300px] text-center mx-auto font-bold flex justify-center items-center bg-black bg-opacity-[0.04] mb-2 rounded text-[2rem]">
                      {page.title}
                    </div>
                  )}
                <div class="font-bold text-[1.2rem]">{page.title}</div>
              </a>
            </li>
          ))}
        </ul>
        <div class="flex justify-between mt-[80px]">
          {p === 0 && <div></div>}
          {p === 1 && <a href="/" class="block underline">前のページ</a>}
          {p > 1 && <a href={`/?p=${p - 1}`} class="block underline">前のページ</a>}
          <a href={`/?p=${p + 1}`} class="block underline">次のページ</a>
        </div>
      </div>
    </Layout>
  );
}
