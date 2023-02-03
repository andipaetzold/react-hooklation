import { PropsWithChildren } from "react";
import { context, ContextValue } from "./context.js";

export type HooklationProviderProps = ContextValue;

export function HooklationProvider({
  children,
  ...props
}: PropsWithChildren<HooklationProviderProps>) {
  return <context.Provider value={props}>{children}</context.Provider>;
}
