import "./bot/index.ts";

Deno.serve(() => {
  return new Response("Hello World");
});
