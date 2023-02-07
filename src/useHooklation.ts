import { useCallback } from "react";
import { SEPARATOR } from "./constants.js";
import { get } from "./get.js";
import { getPluralKeyPart } from "./getPluralKeyPart.js";
import {
  Config,
  HooklationTranslation,
  HooklationTranslations,
  KeyPrefix,
  PrefixedKey,
} from "./types/index.js";
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
  TTranslationKeyPrefix extends KeyPrefix<TTranslation>
> = (
  key: PrefixedKey<TTranslation, TTranslationKeyPrefix>,
  context?: Context
) => Config["returnValue"];

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
  const { locale, emitEvent } = useHooklationContext();
  const translation = translations[locale];

  return useCallback(
    (key, context: Context = {}) => {
      const fullKey = prefix ? `${prefix}${SEPARATOR}${key}` : key;
      if (!translation) {
        emitEvent("missingLocale", { locale });
        return fullKey;
      }

      const result = getTranslation(translation, fullKey, context);
      if (result === undefined) {
        emitEvent("missingKey", { locale, key: fullKey });
        return fullKey;
      }
      return interpolate(result, context);
    },
    [prefix, translation, emitEvent, locale]
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
