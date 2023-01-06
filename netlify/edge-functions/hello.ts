export default async function handler(req: Request) {
  return new Response(JSON.stringify({ foo: "bar" }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
