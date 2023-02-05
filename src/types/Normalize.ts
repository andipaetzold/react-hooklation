import type { IsPluralValue } from "./plural.js";
import type { StringMap, StringMapValue } from "./util.js";

export type Normalize<TStringMap extends StringMap> = {
  [key in keyof TStringMap]: NormalizeInner<TStringMap[key]>;
};

type NormalizeInner<TStringMapValue extends StringMapValue> =
  IsPluralValue<TStringMapValue> extends true
    ? string
    : {
        [key in keyof TStringMapValue]: TStringMapValue[key] extends string
          ? string
          : TStringMapValue[key] extends StringMapValue
          ? NormalizeInner<TStringMapValue[key]>
          : never;
      };
