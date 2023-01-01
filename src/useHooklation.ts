import { useCallback } from "react";
import { SEPARATOR } from "./constants.js";
import { get } from "./get.js";
import { getPluralKeyPart } from "./getPluralKeyPart.js";
import {
  HooklationTranslation,
  HooklationTranslations,
  KeyPrefix,
  PrefixedKey,
} from "./types.js";
import { useHooklationContext } from "./useHooklationContext.js";
import { interpolate } from "./interpolate.js";

export interface UseHooklationOptions<
  TTranslation extends HooklationTranslation,
  TPrefix extends KeyPrefix<TTranslation>
> {
  prefix?: TPrefix;
}

export type UseHooklationReturn<
  TTranslation extends HooklationTranslation,
  TPrefix extends KeyPrefix<TTranslation>
> = (key: PrefixedKey<TTranslation, TPrefix>, context?: Context) => string;

interface Context {
  readonly count?: number | [number];
  readonly [vars: string]: unknown;
}

export function useHooklation<
  TTranslation extends HooklationTranslation,
  TPrefix extends KeyPrefix<TTranslation> = never
>(
  translations: HooklationTranslations<TTranslation>,
  { prefix }: UseHooklationOptions<TTranslation, TPrefix> = {}
): UseHooklationReturn<TTranslation, TPrefix> {
  const { locale, onKeyNotFound, onLocaleNotFound } = useHooklationContext();
  const translation = translations[locale];

  return useCallback(
    (key, context: Context = {}) => {
      const fullKey = prefix ? `${prefix}${SEPARATOR}${key}` : key;
      if (!translation) {
        onLocaleNotFound?.(locale);
        return fullKey;
      }

      const result = getTranslation(translation, fullKey, context);
      if (result === undefined) {
        onKeyNotFound?.(fullKey);
        return fullKey;
      }
      return interpolate(result, context);
    },
    [prefix, translation, onKeyNotFound, onLocaleNotFound, locale]
  );
}

function getTranslation(
  translation: HooklationTranslation,
  key: string,
  context: Context
): string | undefined {
  let result = get<HooklationTranslation | string>(translation, key);
  if (typeof result === "string") {
    return result;
  }

  if (!result) {
    return;
  }

  // Plural
  const count =
    (Array.isArray(context.count) ? context.count[0] : context.count) ?? 0;
  const lastKeyPart = getPluralKeyPart(Object.keys(result), count);
  if (!lastKeyPart) {
    return;
  }

  result = result[lastKeyPart];

  if (typeof result !== "string") {
    return;
  }

  return result;
}
