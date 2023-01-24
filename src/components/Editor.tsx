import { createClient } from "@supabase/supabase-js";
import type { Database } from "lib/database.types";
import { createSignal, onMount } from "solid-js";
import type { Page } from "lib/types";

type PP = Pick<Page, "id" | "title">;

export const Editor = () => {
  const client = createClient<Database>(
    import.meta.env.PUBLIC_SUPABASE_URL,
    import.meta.env.PUBLIC_SUPABASE_ANON_KEY
  );
  const [pages, setPages] = createSignal<PP[]>([]);
  const [start, setStart] = createSignal(0);
  onMount(() => {
    const url = new URL(window.location.href);
    const localStart = parseInt(url.searchParams.get("start") ?? "0");
    client
      .from("pages")
      .select("id,title")
      .order("created", {
        ascending: false,
      })
      .range(localStart, localStart + 100)
      .then((res) => {
        if (res.data) {
          setPages(res.data);
          setStart(localStart);
        }
      });
  });
  const toArticle = async (page: PP) => {
    const { data } = await client
      .from("articles")
      .select("id")
      .eq("page_id", page.id)
      .limit(1);
    if (data?.length === 0) {
      await client.from("articles").insert({
        page_id: page.id,
      });
    }
  };
  const toClip = async (page: PP) => {
    const { data } = await client
      .from("clips")
      .select("id")
      .eq("page_id", page.id)
      .limit(1);
    if (data?.length === 0) {
      await client.from("clips").insert({
        page_id: page.id,
      });
    }
  };
  return (
    <div class="p-1">
      <a href={`/edit?start=${start() + 100}`}>
        <button class="border border-solid border-black rounded px-1">
          next
        </button>
      </a>
      {pages().map((page) => (
        <div class="my-2">
          <button
            onClick={[toArticle, page]}
            class="border border-solid border-black px-1 mr-1 rounded"
          >
            to article
          </button>
          <button
            onClick={[toClip, page]}
            class="border border-solid border-black px-1 mr-1 rounded"
          >
            to clip
          </button>
          {page.title}
        </div>
      ))}
      <a href={`/edit?start=${start() + 100}`}>
        <button class="border border-solid border-black rounded px-1">
          next
        </button>
      </a>
    </div>
  );
};
