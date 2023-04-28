import { SEPARATOR } from "../constants.js";
import {
  Config,
  Context,
  HooklationPlugin,
  HooklationTranslation,
  HooklationTranslations,
  Key,
  MissingKeyError,
  MissingLocaleError,
} from "../types/index.js";
import { getPluralKeyPart } from "./getPluralKeyPart.js";

export interface TranslateOptions<TTranslation extends HooklationTranslation> {
  locale: Config["locale"];
  key: Key<TTranslation>;
  translations: HooklationTranslations<TTranslation>;
  context?: Context;
  plugins?: ReadonlyArray<HooklationPlugin>;
}

export function translate<
  TReturnValue extends Config["returnValue"],
  TTranslation extends HooklationTranslation
>({
  locale,
  key,
  translations,
  context = {},
  plugins = [],
}: TranslateOptions<TTranslation>): TReturnValue {
  const translation = translations[locale];

  if (!translation) {
    plugins.forEach((p) =>
      p.events?.missingLocale?.(new MissingLocaleError(locale))
    );
    return key as string as TReturnValue;
  }

  const value = getTranslation(translation, key, context);
  if (value === undefined) {
    plugins.forEach((p) =>
      p.events?.missingKey?.(new MissingKeyError(locale, key))
    );
    return key as string as TReturnValue;
  }

  return plugins.reduce(
    (value, plugin) =>
      plugin.transformValue?.({
        key,
        locale,
        context,
        value,
      }) ?? value,
    value as unknown
  ) as TReturnValue;
}

function getTranslation(
  translation: HooklationTranslation,
  key: string,
  context: Context
): string | undefined {
  let result = resolveValue<HooklationTranslation | string>(translation, key);
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

function resolveValue<T = unknown>(obj: unknown, key: string): T | undefined {
  const keyParts = key.split(SEPARATOR);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let result: any = obj;
  for (const keyPart of keyParts) {
    // replace with Object.hasOwn in the future
    if (result.hasOwnProperty(keyPart)) {
      result = result[keyPart];
      continue;
    }

    if (result.hasOwnProperty("*")) {
      result = result["*"];
      continue;
    }

    return;
  }

  return result as T;
}
