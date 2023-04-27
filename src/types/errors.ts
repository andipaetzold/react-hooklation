import { Config } from "./Config.js";

export class MissingKeyError extends Error {
  constructor(public locale: Config["locale"], public key: string) {
    super(`Missing key "${key}" in locale "${locale}"`);
  }
}

export class MissingLocaleError extends Error {
  constructor(public locale: string) {
    super(`Missing locale "${locale}"`);
  }
}
