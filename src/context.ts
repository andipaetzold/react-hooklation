import { createContext } from "react";
import { HooklationContextValue } from "./types.js";

export const hooklationContext = createContext<
  HooklationContextValue | undefined
>(undefined);
