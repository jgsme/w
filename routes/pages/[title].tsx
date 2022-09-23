import { Handlers, PageProps } from "$fresh/server.ts";
import { useMemo } from "preact/hooks";
import { parse } from "scrapbox-parser";
import { Render } from "../../components/Render.tsx";
import { titlePurify } from "../../lib/titlePurify.ts";

export const handler: Handlers<string | null> = {
  async GET(_, ctx) {
    const { title } = ctx.params;
    const res = await fetch(
      `https://scrapbox.io/api/pages/jigsaw/${
        titlePurify(decodeURIComponent(title))
      }/text`,
    );
    if (res.status !== 200) {
      return ctx.render(null);
    }
    const text = await res.text();
    return ctx.render(text);
  },
};

export default function Page({ data }: PageProps<string>) {
  const page = useMemo(() => {
    if (data) {
      return parse(data);
    }
    return null;
  }, [data]);
  return page
    ? (
      <div class="max-w-[600px] mx-auto p-2">
        <Render page={page}></Render>
      </div>
    )
    : null;
}
