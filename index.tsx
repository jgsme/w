import {
  h,
  Helmet,
  renderSSR,
} from "https://deno.land/x/nano_jsx@v0.0.28/mod.ts";
import { Application, Router } from "https://deno.land/x/oak@v10.1.0/mod.ts";
import { parse } from "https://deno.land/x/scrapbox_parser@0.0.1/src/index.ts";

const router = new Router();

const App = () => (
  <div>
    <Helmet>
      <title>Nano JSX SSR</title>
    </Helmet>
    <h1>It works!!</h1>
  </div>
);

const ssr = renderSSR(<App />);
const { body, head } = Helmet.SSR(ssr);

const html = `
<head>
  <meta charset="UTF-8">
  ${head.join("\n")}
</head>
<body>
  ${body}
</body>
`;

router.get("/pages/:name", async (ctx) => {
  const res = await fetch(
    `https://scrapbox.io/api/pages/jigsaw/${
      encodeURIComponent(ctx.params.name)
    }/text`,
  );
  const text = await res.text();
  console.log(parse(text));
  ctx.response.body = html;
  ctx.response.type = "html";
});

const app = new Application();
app.use(router.routes());
app.listen({ port: 8080 });
