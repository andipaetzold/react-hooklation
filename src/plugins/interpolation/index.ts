import { HooklationPlugin } from "../../types/index.js";
import { interpolate } from "./interpolate.js";

export function interpolationPlugin(): HooklationPlugin {
  return {
    transformValue: ({ value, context }) =>
      typeof value === "string" ? interpolate(value, context) : value,
  };
}
