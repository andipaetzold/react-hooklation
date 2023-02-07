import { HooklationPlugin } from "../../types/index.js";
import { interpolate } from "./interpolate.js";

export const InterpolationPlugin: HooklationPlugin = {
  transformValue: ({ value, context }) =>
    typeof value === "string" ? interpolate(value, context) : value,
};
