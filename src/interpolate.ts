import { SEPARATOR } from "./constants.js";

const PREFIX = "\\{\\{\\s*";
const SUFFIX = "\\s*\\}\\}";

export function interpolate(
  text: string,
  vars: Record<string, unknown>
): string {
  let result = text;
  const replacements = dotify(vars);
  for (const [key, value] of Object.entries(replacements)) {
    result = result.replace(
      new RegExp(`${PREFIX}${key}${SUFFIX}`, "g"),
      String(value)
    );
  }

  return result;
}

function dotify(o: unknown): { [key: string]: unknown } {
  const res: { [key: string]: unknown } = {};

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function recurse(obj: any, current?: string) {
    for (const key in obj) {
      const value = obj[key];
      const newKey = current ? `${current}${SEPARATOR}${key}` : key;

      if (value && value instanceof Date) {
        res[newKey] = value;
      } else if (value && typeof value === "object") {
        recurse(value, newKey);
      } else {
        res[newKey] = value;
      }
    }
  }

  recurse(o);
  return res;
}
