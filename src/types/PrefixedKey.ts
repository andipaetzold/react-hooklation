import type { KeyPartSeparator } from "./constants.js";
import type { Key } from "./Key.js";
import type { KeyPrefix } from "./KeyPrefix.js";
import type { IsNever, StringMap, ToString } from "./util.js";

export type PrefixedKey<
  TStringMap extends StringMap,
  TPrefix extends KeyPrefix<TStringMap>
> = IsNever<TPrefix> extends true
  ? Key<TStringMap>
  : {
      [K in Key<TStringMap>]: K extends `${TPrefix}${KeyPartSeparator}${infer KeyPart2}`
        ? `${ToString<KeyPart2>}`
        : never;
    }[Key<TStringMap>];
