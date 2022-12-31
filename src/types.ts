/**
 * Separator
 */
export type S = ".";

export interface HooklationContextValue {
  locale: string;
}

export type HooklationTranslationValue = HooklationTranslation | string;
export interface HooklationTranslation {
  [locale: string]: HooklationTranslationValue;
}

export type Key<TTranslation extends HooklationTranslation> = {
  [K in keyof TTranslation]: TTranslation[K] extends HooklationTranslation
    ? `${ToString<K>}${S}${Key<TTranslation[K]>}`
    : `${ToString<K>}`;
}[keyof TTranslation];

export type KeyPrefix<TTranslation extends HooklationTranslation> = {
  [K in keyof TTranslation]: TTranslation[K] extends HooklationTranslation
    ? `${ToString<K>}` | `${ToString<K>}${S}${KeyPrefix<TTranslation[K]>}`
    : never;
}[keyof TTranslation];

export type PrefixedKey<
  TTranslation extends HooklationTranslation,
  Prefix extends KeyPrefix<TTranslation>
> = IsNever<Prefix> extends true
  ? Key<TTranslation>
  : {
      [K in Key<TTranslation>]: K extends `${Prefix}${S}${infer K2}`
        ? K2
        : never;
    }[Key<TTranslation>];

export interface HooklationTranslations<
  TTranslation extends HooklationTranslation
> {
  [locale: string]: TTranslation;
}

// Utility types
export type IsNever<T> = [T] extends [never] ? true : false;
export type ToString<T> = T & string;
