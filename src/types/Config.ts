import type { Merge } from "./util.js";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface HooklationConfig {}

interface DefaultConfig {
  locale: string;
  returnValue: string;
}

export type Config = Merge<DefaultConfig, HooklationConfig>;
