import type { StringMapValue } from "./util.js";

/**
 * Examples:
 * - `=5`
 * - `>=5`
 */
export type PluralValueKeyPart = `${"=" | ">="}${number}`;

/**
 * IsPluralValue
 *
 * `true` if
 * - every key of TValue matches `PluralValueKeyPart`, and
 * - all values are string
 */
export type IsPluralValue<TValue extends StringMapValue> = {
  [K in keyof TValue]: TValue[K] extends string
    ? K extends PluralValueKeyPart
      ? true
      : false
    : false;
}[keyof TValue] extends true
  ? true
  : false;
