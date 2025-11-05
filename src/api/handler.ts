import { serveDir } from "@std/http/file-server";
import * as channelsRepository from "../repositories/channel.ts";
import * as tierListsRepository from "../repositories/tier-list.ts";
import * as Utils from "./utils.ts";
import config from "./config.ts";
import ingest from "../cron-jobs/ingest.ts";

const handler: Deno.ServeHandler<Deno.NetAddr> = async (req) => {
  const { method, headers, url } = req;
  const { pathname } = new URL(url);

  if (method === "GET" && pathname === "/healthcheck") {
    return new Response("OK", { status: 200 });
  }

  if (pathname === "/channels") {
    const adminKey = headers.get("x-admin-key");

    if (config.ADMIN_KEY !== adminKey) {
      return new Response("Unauthorized", { status: 401 });
    }

    if (method === "GET") {
      const channels = await channelsRepository.getChannels();
      return new Response(Utils.stringify(channels), {
        status: 200,
        headers: { "content-type": "application/json; charset=utf-8" },
      });
    }

    if (method === "DELETE") {
      await channelsRepository.deleteChannels();
      return new Response("OK", { status: 200 });
    }
  }

  if (pathname === "/tier-lists") {
    const adminKey = headers.get("x-admin-key");

    if (config.ADMIN_KEY !== adminKey) {
      return new Response("Unauthorized", { status: 401 });
    }

    if (method === "GET") {
      const tierLists = await tierListsRepository.getTierLists();
      return new Response(Utils.stringify(tierLists), {
        status: 200,
        headers: { "content-type": "application/json; charset=utf-8" },
      });
    }

    if (method === "DELETE") {
      await tierListsRepository.deleteTierLists();
      return new Response("OK", { status: 200 });
    }
  }

  if (pathname === "/ingest") {
    const adminKey = headers.get("x-admin-key");

    if (config.ADMIN_KEY !== adminKey) {
      return new Response("Unauthorized", { status: 401 });
    }

    if (method === "POST") {
      await ingest();
      return new Response("OK", { status: 200 });
    }
  }

  if (method === "GET") {
    return serveDir(req, {
      fsRoot: "src/public",
    });
  }

  return new Response("Not Found", { status: 404 });
};

export default handler;
