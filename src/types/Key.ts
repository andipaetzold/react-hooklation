import type { KeyPartSeparator } from "./constants.js";
import type { PluralValueKeyPart } from "./plural.js";
import type { StringMap, ToString } from "./util.js";

export type Key<TStringMap extends StringMap> = {
  [KeyPart in keyof TStringMap]: TStringMap[KeyPart] extends StringMap
    ? `${ToString<KeyPart>}${KeyInner<TStringMap[KeyPart]>}`
    : ToString<KeyPart>;
}[keyof TStringMap];

type KeyInner<TStringMap extends StringMap> = {
  [KeyPart in keyof TStringMap]: TStringMap[KeyPart] extends StringMap
    ? `${KeyPartSeparator}${ToString<KeyPart>}${KeyInner<TStringMap[KeyPart]>}`
    : KeyPart extends PluralValueKeyPart
    ? ``
    : `${KeyPartSeparator}${ToString<KeyPart>}`;
}[keyof TStringMap];
