import type { Config } from "./Config.js";
import type { StringMap } from "./util.js";

export interface HooklationTranslations<TStringMap extends StringMap> {
  [locale: Config["locale"]]: TStringMap;
}
