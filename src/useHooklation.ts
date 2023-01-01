import { useCallback } from "react";
import { SEPARATOR } from "./constants.js";
import {
  HooklationTranslation,
  HooklationTranslations,
  KeyPrefix,
  PluralValueKeyPart,
  PrefixedKey,
} from "./types.js";
import { useHooklationContext } from "./useHooklationContext.js";
import { get } from "./get.js";

export interface UseHooklationOptions<
  TTranslation extends HooklationTranslation,
  TPrefix extends KeyPrefix<TTranslation>
> {
  prefix?: TPrefix;
}

export type UseHooklationReturn<
  TTranslation extends HooklationTranslation,
  TPrefix extends KeyPrefix<TTranslation>
> = (
  key: PrefixedKey<TTranslation, TPrefix>,
  context?: {
    count?: number | [number];
  }
) => string;

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
    (key, { count = 0 } = {}) => {
      const fullKey = prefix ? `${prefix}${SEPARATOR}${key}` : key;
      if (!translation) {
        onLocaleNotFound?.(locale);
        return fullKey;
      }

      const result = getTranslation(
        translation,
        fullKey,
        typeof count === "number" ? [count] : count
      );
      if (result === undefined) {
        onKeyNotFound?.(fullKey);
        return fullKey;
      }
      return result;
    },
    [prefix, translation, onKeyNotFound, onLocaleNotFound, locale]
  );
}

function getTranslation(
  translation: HooklationTranslation,
  key: string,
  count: [number]
): string | undefined {
  let result = get<HooklationTranslation | string>(translation, key);
  if (typeof result === "string") {
    return result;
  }

  if (!result) {
    return;
  }

  // Plural
  const lastKeyPart = getPluralTranslationKeyPart(Object.keys(result), count);
  if (!lastKeyPart) {
    return;
  }

  result = result[lastKeyPart];

  if (typeof result !== "string") {
    return;
  }

  return result;
}

function getPluralTranslationKeyPart(
  keyParts: string[],
  [count]: [number]
): PluralValueKeyPart | undefined {
  // exact match
  const exactMatch = `=${count}` as const;
  if (keyParts.includes(exactMatch)) {
    return exactMatch;
  }

  // range match
  const smallestRangeStart = keyParts
    .filter((keyPart) => !keyPart.startsWith("="))
    .map((rangeStart) => +rangeStart.slice(2))
    .filter((rangeStart) => !Number.isNaN(rangeStart))
    .sort()
    .reverse()
    .find((rangeStart) => rangeStart <= count);

  if (smallestRangeStart !== undefined) {
    return `>=${smallestRangeStart}`;
  }

  // no match
  return undefined;
}
