import { PropsWithChildren, useCallback } from "react";
import { context } from "./context.js";
import {
  Config,
  HooklationEventEmitter,
  HooklationPlugin,
  HooklationTransformValue,
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

  const transformValue: HooklationTransformValue<
    string,
    Config["returnValue"]
  > = useCallback(
    (params) =>
      plugins.reduce(
        (value, plugin) =>
          plugin.transformValue?.({
            ...params,
            value,
          }) ?? value,
        params.value as unknown
      ) as Config["returnValue"],
    [plugins]
  );

  return (
    <context.Provider value={{ locale, emitEvent, transformValue }}>
      {children}
    </context.Provider>
  );
}
