import { Handler } from "@hono/hono";
import config from "./config.ts";

export const admin: Handler = async (c, next) => {
  const adminKey = c.req.header("x-admin-key");
  if (config.ADMIN_KEY !== adminKey) {
    return c.text("Unauthorized", 401);
  }
  await next();
};
