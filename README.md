# Wzstats

Unofficial wzstats.gg discord bot

## Usage

There is no build / deps installation required.

```bash
# register slash commands
deno task register-commands --id="<APPLICATION_ID>" --token="DISCORD_BOT_TOKEN"
```

```bash
deno task start
# hot reloading
deno task dev
```

## Configuration

### Base

| Environment Variable | Description                                   |
| -------------------- | --------------------------------------------- |
| APPLICATION_ID       | Discord Discord bot app id                    |
| PUBLIC_KEY           | Public Discord bot key                        |
| DISCORD_BOT_TOKEN    | Secret Discord bot token                      |
| DEV_CHANNEL_ID       | Guild id you will use to develop new features |
