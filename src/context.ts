import { createContext } from "react";

export interface ContextValue {
  locale: string;
}

export const context = createContext<ContextValue | undefined>(undefined);
