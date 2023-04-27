import { createContext } from "react";
import { HooklationPlugin } from "../types/index.js";

export interface ContextValue {
  locale: string;
  plugins: ReadonlyArray<HooklationPlugin>;
}

export const context = createContext<ContextValue | undefined>(undefined);
