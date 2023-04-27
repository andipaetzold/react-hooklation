import { useCallback } from "react";
import { SEPARATOR } from "../constants.js";
import {
  Config,
  Context,
  HooklationTranslation,
  HooklationTranslations,
  Key,
  KeyPrefix,
  PrefixedKey,
} from "../types/index.js";
import { translate } from "../core/translate.js";
import { useHooklationContext } from "./useHooklationContext.js";

export interface UseHooklationOptions<
  TTranslation extends HooklationTranslation,
  TPrefix extends KeyPrefix<TTranslation>
> {
  prefix?: TPrefix;
}

export function useHooklation<
  TTranslation extends HooklationTranslation,
  TPrefix extends KeyPrefix<TTranslation> = never
>(
  translations: HooklationTranslations<TTranslation>,
  { prefix }: UseHooklationOptions<TTranslation, TPrefix> = {}
) {
  const { locale, plugins } = useHooklationContext();

  return useCallback(
    (
      keySuffix: PrefixedKey<TTranslation, TPrefix>,
      context: Context = {}
    ): Config["returnValue"] => {
      const key = (
        prefix ? `${prefix}${SEPARATOR}${keySuffix}` : keySuffix
      ) as Key<TTranslation>;

      return translate({
        locale,
        key,
        translations,
        context,
        plugins,
      }) as Config["returnValue"];
    },
    [prefix, locale, translations, plugins]
  );
}
