import { Hono } from "@hono/hono";

const app = new Hono();

app.get("/healthcheck", (c) => {
  return c.text("OK");
});

export default app;
