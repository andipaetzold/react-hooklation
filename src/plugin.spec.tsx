import { renderHook } from "@testing-library/react";
import { PropsWithChildren } from "react";
import { it, expect, vi } from "vitest";
import { HooklationProvider } from "./HooklationProvider";
import { HooklationPlugin } from "./types";
import { useHooklation } from "./useHooklation";

function createWrapper(locale: string, plugin?: HooklationPlugin) {
  return function Provider({ children }: PropsWithChildren) {
    return (
      <HooklationProvider locale={locale} plugins={plugin ? [plugin] : []}>
        {children}
      </HooklationProvider>
    );
  };
}

it("events.missingKey", () => {
  const translations = { en: { hello: "Hello" } };

  const missingKeyHandler = vi.fn();
  const plugin: HooklationPlugin = {
    events: { missingKey: missingKeyHandler },
  };
  const { result } = renderHook(() => useHooklation(translations), {
    wrapper: createWrapper("en", plugin),
  });

  // @ts-expect-error We are explicitely passing a wrong key
  result.current("bye");

  expect(missingKeyHandler).toHaveBeenCalledWith({ locale: "en", key: "bye" });
});

it("events.missingLocale", () => {
  const translations = { en: { hello: "Hello" } };

  const missingLocaleHandler = vi.fn();
  const plugin: HooklationPlugin = {
    events: { missingLocale: missingLocaleHandler },
  };
  const { result } = renderHook(() => useHooklation(translations), {
    wrapper: createWrapper("de", plugin),
  });

  result.current("hello");

  expect(missingLocaleHandler).toHaveBeenCalledWith({ locale: "de" });
});

it("transformValue", () => {
  const translations = { en: { hello: "Hello" } };

  const transformValue = vi
    .fn()
    .mockImplementation(({ value }: { value: string }) => `${value} Andi`);
  const plugin: HooklationPlugin = { transformValue };

  const { result } = renderHook(() => useHooklation(translations), {
    wrapper: createWrapper("en", plugin),
  });

  const value = result.current("hello", { key: "context" });

  expect(value).toBe("Hello Andi");
  expect(transformValue).toBeCalledWith({
    key: "hello",
    locale: "en",
    value: "Hello",
    context: { key: "context" },
  });
});
