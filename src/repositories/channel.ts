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

export async function getChannel(id: Channel["id"]) {
  return (await kv.get<Channel>([BASE_KEY, id])).value;
}

export async function saveChannel(args: Channel) {
  await kv.set([BASE_KEY, args.id], {
    id: args.id,
    type: args.type,
  });
}

export async function deleteChannels() {
  const channels = await getChannels();
  for (let i = 0; i < channels.length; i++) {
    await kv.delete([BASE_KEY, channels[i].id]);
  }
}

export async function deleteChannel(id: Channel["id"]) {
  await kv.delete([BASE_KEY, id]);
}
