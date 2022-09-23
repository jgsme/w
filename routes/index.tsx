import { Handlers, PageProps } from "$fresh/server.ts";
import { titlePurify } from "../lib/titlePurify.ts";

type Page = {
  id: string;
  title: string;
  created: string;
};

export const handler: Handlers<Page[]> = {
  async GET(_, ctx) {
    const res = await fetch(
      "https://w.kbys.tk/api/home",
    );
    if (res.status !== 200) {
      return ctx.render([]);
    }
    const home = await res.json();
    return ctx.render(home);
  },
};

export default function Home({ data }: PageProps<Page[]>) {
  return (
    <ul>
      {data.map((page) => (
        <li key={page.id}>
          <a href={`/pages/${titlePurify(page.title)}`}>{page.title}</a>
        </li>
      ))}
    </ul>
  );
}
