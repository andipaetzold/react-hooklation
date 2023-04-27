import { PropsWithChildren } from "react";
import { Config, HooklationPlugin } from "../types/index.js";
import { context } from "./context.js";

export interface HooklationProviderProps {
  locale: Config["locale"];
  plugins?: ReadonlyArray<HooklationPlugin>;
}

export function HooklationProvider({
  children,
  plugins = [],
  locale,
}: PropsWithChildren<HooklationProviderProps>) {
  return (
    <context.Provider value={{ locale, plugins }}>{children}</context.Provider>
  );
}
