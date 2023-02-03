import { PropsWithChildren, useCallback } from "react";
import { context } from "./context.js";
import { HooklationEventEmitter, HooklationPlugin } from "./types.js";

export interface HooklationProviderProps {
  locale: string;
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
