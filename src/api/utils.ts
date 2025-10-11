export function stringify(obj: unknown, space = 2): string {
  const seen = new WeakSet();

  return JSON.stringify(
    obj,
    function (_key, value) {
      if (typeof value === "object" && value !== null) {
        if (seen.has(value)) {
          return "[Circular]";
        }

        seen.add(value);
      }

      if (typeof value === "bigint") {
        return value.toString() + "n"; // Convert BigInt safely
      }

      if (typeof value === "function") {
        return `[Function: ${value.name || "anonymous"}]`;
      }

      if (typeof value === "symbol") {
        return value.toString();
      }

      return value;
    },
    space,
  );
}
