import client from "./bot/client.ts";
import config from "./bot/config.ts";
import postDailyMeta from "./cron-jobs/post-daily-meta.ts";
import ingest from "./cron-jobs/ingest.ts";

client.login(config.TOKEN);

// Runs twice every 12 hours
Deno.cron("Ingest", { minute: { every: 1 } }, ingest);

// Runs every day at 6am
Deno.cron("Daily meta post", "0 6 * * *", postDailyMeta);

// Healthcheck
Deno.serve(() => new Response("Hello World", { status: 200 }));
