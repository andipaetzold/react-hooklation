import type { KeyPartSeparator } from "./constants.js";
import type { PluralValueKeyPart } from "./plural.js";
import type { StringMap, ToString } from "./util.js";

/**
 * Union type of all keys for `TStringMap`
 */
export type Key<TStringMap extends StringMap> = {
  [KeyPart in keyof TStringMap]: TStringMap[KeyPart] extends StringMap
    ? `${FormatKey<KeyPart>}${KeyInner<TStringMap[KeyPart]>}`
    : FormatKey<KeyPart>;
}[keyof TStringMap];

type KeyInner<TStringMap extends StringMap> = {
  [KeyPart in keyof TStringMap]: TStringMap[KeyPart] extends StringMap
    ? `${KeyPartSeparator}${FormatKey<KeyPart>}${KeyInner<TStringMap[KeyPart]>}` // middle
    : KeyPart extends PluralValueKeyPart
    ? ""
    : `${KeyPartSeparator}${FormatKey<KeyPart>}`; // leaf
}[keyof TStringMap];

type FormatKey<TKeyPart> = TKeyPart extends "*" ? string : ToString<TKeyPart>;
