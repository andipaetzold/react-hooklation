import type { HooklationPlugin } from "../../types/index.js";
import { interpolate } from "./interpolate.js";

export function reactPlugin(): HooklationPlugin {
  return {
    transformValue: ({ value, context }) =>
      typeof value === "string" ? interpolate(value, context) : value,
  };
}
