import { useCallback } from "react";
import { SEPARATOR } from "./constants.js";
import {
  HooklationTranslation,
  HooklationTranslations,
  HooklationTranslationValue,
  KeyPrefix,
  PrefixedKey,
} from "./types.js";
import { useHooklationContext } from "./useHooklationContext.js";

export interface UseHooklationOptions<
  TTranslation extends HooklationTranslation,
  TPrefix extends KeyPrefix<TTranslation>
> {
  prefix?: TPrefix;
}

export type UseHooklationReturn<
  TTranslation extends HooklationTranslation,
  TPrefix extends KeyPrefix<TTranslation>
> = (key: PrefixedKey<TTranslation, TPrefix>) => string;

export function useHooklation<
  TTranslation extends HooklationTranslation,
  TPrefix extends KeyPrefix<TTranslation> = never
>(
  translations: HooklationTranslations<TTranslation>,
  { prefix }: UseHooklationOptions<TTranslation, TPrefix> = {}
): UseHooklationReturn<TTranslation, TPrefix> {
  const { locale } = useHooklationContext();
  const translation = translations[locale];

  return useCallback(
    (key) => {
      const fullKey = prefix ? `${prefix}${SEPARATOR}${key}` : key;
      if (!translation) {
        // TODO: warning
        return fullKey;
      }

      const keys = fullKey.split(SEPARATOR);
      let result: HooklationTranslationValue = translation;
      for (const k of keys) {
        if (typeof result === "string") {
          // TODO: warning
          return fullKey;
        }

        result = result[k];
      }

      if (!(typeof result === "string")) {
        // TODO: warning
        return fullKey;
      }

      return result;
    },
    [translation, prefix]
  );
}
