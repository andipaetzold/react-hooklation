import { createContext } from "react";
import { HooklationEventEmitter } from "./types/index.js";

export interface ContextValue {
  locale: string;
  emitEvent: HooklationEventEmitter;
}

export const context = createContext<ContextValue | undefined>(undefined);
