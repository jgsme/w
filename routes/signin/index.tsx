import { Handlers, PageProps } from "$fresh/server.ts";
import { Layout } from "../../components/Layout.tsx";
import SignIn from "../../islands/SignIn.tsx";

export const handler: Handlers<{
  url: string;
  key: string;
}> = {
  GET(_, ctx) {
    return ctx.render({
      url: Deno.env.get("SUPABASE_URL")!,
      key: Deno.env.get("SUPABASE_ANON_KEY")!,
    });
  },
};

export default function SignInPage({ data: { url, key } }: PageProps<{
  url: string;
  key: string;
}>) {
  return (
    <Layout>
      <SignIn
        url={url}
        _key={key}
      >
      </SignIn>
    </Layout>
  );
}
