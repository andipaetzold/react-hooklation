import { createContext } from "react";
import { Config, HooklationEventEmitter } from "../types/index.js";

export interface ContextValue {
  locale: string;
  emitEvent: HooklationEventEmitter;
  transformValue: (params: {
    key: string;
    value: string;
    locale: Config["locale"];
    context: Record<string, unknown>;
  }) => Config["returnValue"];
}

export const context = createContext<ContextValue | undefined>(undefined);
