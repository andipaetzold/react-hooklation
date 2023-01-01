/**
 * Naming
 * Key: 'x.y.z'
 * KeyPart: 'x', 'y', 'z' of 'x.y.z'
 */

// Constants
export type KeyPartSeparator = ".";

// Exported types
export interface HooklationContextValue {
  locale: string;
}

export type HooklationTranslationValue = HooklationTranslation | string;
export interface HooklationTranslation {
  [locale: string]: HooklationTranslationValue;
}

// Key
export type Key<TTranslation extends HooklationTranslation> = {
  [KeyPart in keyof TTranslation]: TTranslation[KeyPart] extends HooklationTranslation
    ? `${ToString<KeyPart>}${KeyInner<TTranslation[KeyPart]>}`
    : `${ToString<KeyPart>}`;
}[keyof TTranslation];

type KeyInner<TTranslation extends HooklationTranslation> = {
  [KeyPart in keyof TTranslation]: TTranslation[KeyPart] extends HooklationTranslation
    ? `${KeyPartSeparator}${ToString<KeyPart>}${KeyInner<
        TTranslation[KeyPart]
      >}`
    : KeyPart extends PluralValueKeyPart
    ? ``
    : `${KeyPartSeparator}${ToString<KeyPart>}`;
}[keyof TTranslation];

// Key Prefix
export type KeyPrefix<TTranslation extends HooklationTranslation> = {
  [KeyPart in keyof TTranslation]: IsLastKeyPart<
    TTranslation[KeyPart]
  > extends true
    ? never
    : TTranslation[KeyPart] extends HooklationTranslation
    ?
        | `${ToString<KeyPart>}`
        | `${ToString<KeyPart>}${KeyPartSeparator}${KeyPrefix<
            TTranslation[KeyPart]
          >}`
    : never;
}[keyof TTranslation];

export type PrefixedKey<
  TTranslation extends HooklationTranslation,
  TPrefix extends KeyPrefix<TTranslation>
> = IsNever<TPrefix> extends true
  ? Key<TTranslation>
  : {
      [K in Key<TTranslation>]: K extends `${TPrefix}${KeyPartSeparator}${infer KeyPart2}`
        ? `${ToString<KeyPart2>}`
        : never;
    }[Key<TTranslation>];

export interface HooklationTranslations<
  TTranslation extends HooklationTranslation
> {
  [locale: string]: TTranslation;
}

type IsLastKeyPart<TKeyPartValue extends HooklationTranslationValue> =
  TKeyPartValue extends string ? true : IsPluralValue<TKeyPartValue>;

type PluralValueKeyPart = `${"=" | ">="}${number}`;

/**
 * IsPluralValue
 *
 * `true` if
 * - every key of TValue matches `PluralValueKeyPart`, and
 * - all values are string
 */
type IsPluralValue<TValue extends HooklationTranslationValue> = {
  [K in keyof TValue]: TValue[K] extends string
    ? K extends PluralValueKeyPart
      ? true
      : false
    : false;
}[keyof TValue] extends true
  ? true
  : false;

// Utility types
type IsNever<T> = [T] extends [never] ? true : false;
type ToString<T> = T & string;
