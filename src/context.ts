import { createContext } from "react";

export interface ContextValue {
  locale: string;
  onKeyNotFound?: (key: string) => void;
  onLocaleNotFound?: (locale: string) => void;
}

export const context = createContext<ContextValue | undefined>(undefined);
