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
> = (
  key: PrefixedKey<TTranslation, TPrefix>,
  context?: {
    count?: number;
  }
) => string;

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
    (key, { count = 0 } = {}) => {
      const fullKey = prefix ? `${prefix}${SEPARATOR}${key}` : key;
      if (!translation) {
        // TODO: warning
        return fullKey;
      }

      return getTranslation(translation, fullKey, count);
    },
    [translation, prefix]
  );
}

function getTranslation(
  translation: HooklationTranslation,
  key: string,
  count: number
): string {
  const keyParts = key.split(SEPARATOR);

  let result: HooklationTranslationValue = translation;
  for (const keyPart of keyParts) {
    if (typeof result === "string") {
      // TODO: warning
      return key;
    }

    result = result[keyPart];
  }

  if (typeof result === "string") {
    return result;
  }

  if (result === undefined) {
    // TODO: warning
    return key;
  }

  // Plural
  const lastKeyPart = getPluralTranslationKeyPart(Object.keys(result), count);
  if (lastKeyPart === undefined) {
    // TODO: warning
    return key;
  }

  result = result[lastKeyPart];

  if (!(typeof result === "string")) {
    // TODO: warning
    return key;
  }

  return result;
}

function getPluralTranslationKeyPart(
  keyParts: string[],
  count: number
): string | undefined {
  // exact match
  if (keyParts.includes(`=${count}`)) {
    return `=${count}`;
  }

  // range match
  const smallestRangeStart = keyParts
    .filter((keyPart) => !keyPart.startsWith("="))
    .map((rangeStart) => rangeStart.slice(2))
    .map((rangeStart) => +rangeStart)
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
