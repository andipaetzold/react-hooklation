import { SEPARATOR } from "./constants.js";

export function get<T = unknown>(obj: unknown, key: string): T | undefined {
  const keyParts = key.split(SEPARATOR);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let result: any = obj;
  for (const keyPart of keyParts) {
    // replace with Object.hasOwn in the future
    if (result.hasOwnProperty(keyPart)) {
      result = result[keyPart];
    } else {
      return undefined;
    }
  }

  return result as T;
}
