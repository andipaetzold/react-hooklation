import { PropsWithChildren } from "react";
import { context } from "./context.js";

export interface HooklationProviderProps {
  locale: string;
}

export function HooklationProvider({
  locale,
  children,
}: PropsWithChildren<HooklationProviderProps>) {
  return <context.Provider value={{ locale }}>{children}</context.Provider>;
}
