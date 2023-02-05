import type { Config } from "./Config.js";
import type { StringMap } from "./util.js";

export type HooklationTranslations<TStringMap extends StringMap> = {
  [locale in Config["locale"]]: TStringMap;
};
