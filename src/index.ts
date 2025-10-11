import client from "./bot/client.ts";
import config from "./bot/config.ts";
import postDailyMeta from "./cron-jobs/post-daily-meta.ts";
import ingest from "./cron-jobs/ingest.ts";
import handler from "./api/handler.ts";

client.login(config.TOKEN);

Deno.cron("Ingest", { hour: { every: 1 } }, ingest);
Deno.cron("Daily meta post", { hour: { exact: 0 } }, postDailyMeta);

Deno.serve(handler);
