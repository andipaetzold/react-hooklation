import type { KeyPartSeparator } from "./constants.js";
import type { IsPluralValue } from "./plural.js";
import type { StringMap, StringMapValue, ToString } from "./util.js";

/**
 * Union type of all key prefixes for `TStringMap`
 */
export type KeyPrefix<TStringMap extends StringMap> = {
  [KeyPart in keyof TStringMap]: IsLastKeyPart<
    TStringMap[KeyPart]
  > extends string
    ? never
    : TStringMap[KeyPart] extends StringMap
    ?
        | ToString<KeyPart>
        | `${ToString<KeyPart>}${KeyPartSeparator}${KeyPrefix<
            TStringMap[KeyPart]
          >}`
    : never;
}[keyof TStringMap];

type IsLastKeyPart<TStringMapValue extends StringMapValue> =
  TStringMapValue extends string ? true : IsPluralValue<TStringMapValue>;
