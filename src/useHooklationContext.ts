import { useContext } from "react";
import { hooklationContext as context } from "./context.js";
import { HooklationContextValue } from "./types.js";

export function useHooklationContext(): HooklationContextValue {
  const value = useContext(context);
  if (!value) {
    throw new Error(`Must be used within 'HooklationProvider'.`);
  }
  return value;
}
