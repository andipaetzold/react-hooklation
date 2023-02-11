import { Config } from "../types/Config.js";
import { useHooklationContext } from "./useHooklationContext.js";

export function useLocale(): Config["locale"] {
  return useHooklationContext().locale;
}
