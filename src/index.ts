import client from "./bot/client.ts";
import config from "./bot/config.ts";
import postDailyMeta from "./cron-jobs/post-daily-meta.ts";
import ingest from "./cron-jobs/ingest.ts";
import app from "./api/index.ts";

client.login(config.TOKEN);

Deno.cron("Ingest", { minute: { every: 1 } }, ingest);
Deno.cron("Daily meta post", { hour: { exact: 0 } }, postDailyMeta);

Deno.serve(app.fetch);
