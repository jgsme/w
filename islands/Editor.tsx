import { useCallback, useEffect, useMemo, useState } from "preact/hooks";
import type { FunctionComponent } from "preact";
import { createClient } from "supabase";
import { Database } from "../lib/database.types.ts";
import { Head } from "$fresh/src/runtime/head.ts";

type Page = {
  id: string;
  title: string;
};

const Editor: FunctionComponent<{ url: string; _key: string }> = (
  { url, _key },
) => {
  const client = useMemo(() => {
    return createClient<Database>(
      url,
      _key,
    );
  }, [url, _key]);
  const [pages, setPages] = useState<
    Page[]
  >([]);
  const [start, setStart] = useState(0);
  useEffect(() => {
    const url = new URL(window.location.href);
    const localStart = parseInt(url.searchParams.get("start") ?? "0");
    client.from("pages").select("id,title").order("created", {
      ascending: false,
    }).range(localStart, localStart + 100)
      .then((res) => {
        if (res.data) {
          setPages(res.data);
          setStart(localStart);
        }
      });
  }, []);
  const toArticle = useCallback((page: Page) => async () => {
    const { data } = await client.from("articles").select("id").eq(
      "page_id",
      page.id,
    ).limit(1);
    if (data?.length === 0) {
      await client.from("articles").insert({
        page_id: page.id,
      });
    }
  }, []);
  const toClip = useCallback((page: Page) => async () => {
    const { data } = await client.from("clips").select("id").eq(
      "page_id",
      page.id,
    ).limit(1);
    if (data?.length === 0) {
      await client.from("clips").insert({
        page_id: page.id,
      });
    }
  }, []);
  return (
    <div class="p-1">
      <Head>
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>
      <a href={`/edit?start=${start + 100}`}>
        <button class="border border-solid border-black rounded px-1">
          next
        </button>
      </a>
      {pages.map((page) => (
        <div key={page.id} class="my-2">
          <button
            onClick={toArticle(page)}
            class="border border-solid border-black px-1 mr-1 rounded"
          >
            to article
          </button>
          <button
            onClick={toClip(page)}
            class="border border-solid border-black px-1 mr-1 rounded"
          >
            to clip
          </button>
          {page.title}
        </div>
      ))}
      <a href={`/edit?start=${start + 100}`}>
        <button class="border border-solid border-black rounded px-1">
          next
        </button>
      </a>
    </div>
  );
};

export default Editor;
