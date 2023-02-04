import { PropsWithChildren, useCallback } from "react";
import { context } from "./context.js";
import {
  Config,
  HooklationEventEmitter,
  HooklationPlugin,
} from "./types/index.js";

export interface HooklationProviderProps {
  locale: Config["locale"];
  plugins?: HooklationPlugin[];
}

export function HooklationProvider({
  children,
  plugins = [],
  locale,
}: PropsWithChildren<HooklationProviderProps>) {
  const emitEvent: HooklationEventEmitter = useCallback(
    (event, detail) => plugins.forEach((p) => p.events?.[event]?.(detail)),
    [plugins]
  );

  return (
    <context.Provider value={{ locale, emitEvent }}>
      {children}
    </context.Provider>
  );
}
