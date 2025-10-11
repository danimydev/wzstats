const ADMIN_KEY = Deno.env.get("ADMIN_KEY");

if (!ADMIN_KEY) {
  throw new Error("ADMIN_KEY is required");
}

export default {
  ADMIN_KEY,
};
