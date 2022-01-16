/** @jsx h */
import { serve } from "https://deno.land/std@0.121.0/http/server.ts";
import {
  h,
  Helmet,
  renderSSR,
} from "https://deno.land/x/nano_jsx@v0.0.28/mod.ts";

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

console.log("Listening on http://localhost:8000");
serve((_req) => {
  return new Response(html, {
    headers: { "content-type": "text/html" },
  });
});
