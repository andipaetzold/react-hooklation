import {
  HooklationTranslation,
  HooklationTranslations,
  KeyPrefix,
} from "./types/index.js";
import { useHooklation, UseHooklationOptions } from "./useHooklation.js";

export function createHooklationHook<
  TTranslation extends HooklationTranslation
>(translations: HooklationTranslations<TTranslation>) {
  return <TPrefix extends KeyPrefix<TTranslation> = never>(
    options?: UseHooklationOptions<TTranslation, TPrefix>
  ) => useHooklation(translations, options);
}
