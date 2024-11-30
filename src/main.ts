import "./bot/index.ts";

Deno.serve(() => {
  return new Response("Hello World");
});

Deno.cron("Run once every 5 minutes", { minute: { every: 5 } }, async () => {
  const res = await fetch("http://0.0.0.0:8000/");
  console.log(res);
});
