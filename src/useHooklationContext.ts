import { useContext } from "react";
import { context, ContextValue } from "./context.js";

export function useHooklationContext(): ContextValue {
  const value = useContext(context);
  if (!value) {
    throw new Error(`Must be used within 'HooklationProvider'.`);
  }
  return value;
}
