import { Hono } from "@hono/hono";
import * as channelsRepository from "../repositories/channel.ts";
import { admin } from "./middlewares.ts";

const app = new Hono();

app.get("/healthcheck", (c) => {
  return c.text("OK", 200);
});

app.use("/channels", admin);

app.get("/channels", async (c) => {
  const channels = await channelsRepository.getChannels();
  return c.json(channels, 200);
});

app.delete("/channels", async (c) => {
  const channels = await channelsRepository.getChannels();
  const deleteChannelPromises = channels.map((c) =>
    channelsRepository.deleteChannel(c.id)
  );
  await Promise.all(deleteChannelPromises);
  return c.text("OK", 200);
});

export default app;
