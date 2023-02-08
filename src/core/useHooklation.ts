import { useCallback } from "react";
import { SEPARATOR } from "../constants.js";
import { get } from "../util/get.js";
import { getPluralKeyPart } from "./getPluralKeyPart.js";
import {
  Config,
  HooklationTranslation,
  HooklationTranslations,
  KeyPrefix,
  PrefixedKey,
} from "../types/index.js";
import { useHooklationContext } from "./useHooklationContext.js";

export interface UseHooklationOptions<
  TTranslation extends HooklationTranslation,
  TPrefix extends KeyPrefix<TTranslation>
> {
  prefix?: TPrefix;
}

export interface Context {
  readonly count?: number | [number];
  readonly [vars: string]: unknown;
}

export function useHooklation<
  TTranslation extends HooklationTranslation,
  TPrefix extends KeyPrefix<TTranslation> = never
>(
  translations: HooklationTranslations<TTranslation>,
  { prefix }: UseHooklationOptions<TTranslation, TPrefix> = {}
) {
  const { locale, emitEvent, transformValue } = useHooklationContext();
  const translation = translations[locale];

  return useCallback(
    <TReturnValue extends Config["returnValue"]>(
      keySuffix: PrefixedKey<TTranslation, TPrefix>,
      context: Context = {}
    ): TReturnValue => {
      const key = prefix ? `${prefix}${SEPARATOR}${keySuffix}` : keySuffix;
      if (!translation) {
        emitEvent("missingLocale", { locale });
        return key as TReturnValue;
      }

      const value = getTranslation(translation, key, context);
      if (value === undefined) {
        emitEvent("missingKey", { locale, key });
        return key as TReturnValue;
      }

      return transformValue({
        locale,
        key,
        value,
        context,
      }) as TReturnValue;
    },
    [prefix, translation, transformValue, locale, emitEvent]
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
