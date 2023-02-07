import { Config } from "./Config.js";

export interface HooklationPlugin {
  events?: {
    [T in keyof HooklationEventDetails]?: (
      detail: HooklationEventDetails[T]
    ) => void;
  };
  transformValue?: HooklationTransformValue;
}

export interface HooklationEventDetails {
  missingKey: { locale: string; key: string };
  missingLocale: { locale: string };
}

export interface HooklationEventEmitter {
  <T extends keyof HooklationEventDetails>(
    event: T,
    detail: HooklationEventDetails[T]
  ): void;
}

export type HooklationTransformValue<T = unknown, U = unknown> = (params: {
  locale: Config["locale"];
  key: string;
  value: T;
  context: Record<string, unknown>;
}) => U;
