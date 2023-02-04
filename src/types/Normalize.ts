import {
  HooklationTranslation,
  HooklationTranslationValue,
} from "./HooklationTranslation.js";
import { IsPluralValue } from "./plural.js";

export type Normalize<TTranslation extends HooklationTranslation> = {
  [key in keyof TTranslation]: NormalizeInner<TTranslation[key]>;
};

type NormalizeInner<TTranslation extends HooklationTranslationValue> =
  IsPluralValue<TTranslation> extends true
    ? string
    : {
        [key in keyof TTranslation]: TTranslation[key] extends string
          ? string
          : TTranslation[key] extends HooklationTranslationValue
          ? NormalizeInner<TTranslation[key]>
          : never;
      };
