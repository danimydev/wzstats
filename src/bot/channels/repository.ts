const kv = await Deno.openKv();

const BASE_KEY = "channels";

type Channel = {
  id: string;
  type: number;
};

export async function getChannels() {
  const channelsIterator = kv.list<Channel>({ prefix: [BASE_KEY] });
  const channels = [];
  for await (const e of channelsIterator) {
    channels.push(e.value);
  }
  return channels;
}

export async function addChannel(args: {
  id: string;
  type: number;
}) {
  await kv.set([BASE_KEY, args.id], {
    id: args.id,
    type: args.type,
  });
}

export async function deleteChannel(id: string) {
  await kv.delete([BASE_KEY, id]);
}
