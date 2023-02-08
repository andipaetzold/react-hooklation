import type { Merge } from "./util.js";

/**
 * Config that can be overridden
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface HooklationConfig {}

/**
 * Default configuration if not set in {@see HooklationConfig}
 */
interface DefaultConfig {
  locale: string;
  returnValue: string;
}

/**
 * Actual config that is used
 */
export type Config = Merge<DefaultConfig, HooklationConfig>;
