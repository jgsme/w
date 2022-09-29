import { Handlers, PageProps } from "$fresh/server.ts";
import { Layout } from "../../components/Layout.tsx";
import SignUp from "../../islands/SignUp.tsx";

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

export default function SignUpPage({ data: { url, key } }: PageProps<{
  url: string;
  key: string;
}>) {
  return (
    <Layout>
      <SignUp
        url={url}
        _key={key}
      >
      </SignUp>
    </Layout>
  );
}
