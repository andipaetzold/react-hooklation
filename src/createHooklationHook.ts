import { HooklationTranslations, KeyPrefix, StringMap } from "./types/index.js";
import { useHooklation, UseHooklationOptions } from "./useHooklation.js";

export function createHooklationHook<TStringMap extends StringMap>(
  translations: HooklationTranslations<TStringMap>
) {
  return <TPrefix extends KeyPrefix<TStringMap> = never>(
    options?: UseHooklationOptions<TStringMap, TPrefix>
  ) => useHooklation(translations, options);
}
