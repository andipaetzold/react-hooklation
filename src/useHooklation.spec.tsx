import { renderHook } from "@testing-library/react";
import { PropsWithChildren } from "react";
import { describe, expect, it, vi } from "vitest";
import { HooklationProvider } from "./provider.js";
import { useHooklation } from "./useHooklation.js";

const translations = {
  en: {
    title: "Welcome!",
    greeting: {
      hello: "Hello",
    },
  },
  de: {
    title: "Willkommen!", // title
    greeting: {
      hello: "Hallo", // greeting.hellp
    },
  },
};

function createWrapper(locale: string) {
  return function Provider({ children }: PropsWithChildren) {
    return <HooklationProvider locale={locale}>{children}</HooklationProvider>;
  };
}

it("throws outside of HooklationProvider", () => {
  const originalError = console.error;
  console.error = vi.fn();

  expect(() => renderHook(() => useHooklation(translations))).toThrow();

  console.error = originalError;
});

describe("t", () => {
  it("returns key for unknown locale", () => {
    const { result } = renderHook(() => useHooklation(translations), {
      wrapper: createWrapper("fr"),
    });

    expect(result.current("title")).toBe("title");
    expect(result.current("greeting.hello")).toBe("greeting.hello");
  });

  it("returns key for unknown key", () => {
    const { result } = renderHook(() => useHooklation(translations), {
      wrapper: createWrapper("en"),
    });

    // @ts-expect-error We test an unknown key
    expect(result.current("wrong")).toBe("wrong");
    // @ts-expect-error We test an unknown key
    expect(result.current("greeting")).toBe("greeting");
    // @ts-expect-error We test an unknown key
    expect(result.current("greeting.wrong")).toBe("greeting.wrong");
    // @ts-expect-error We test an unknown key
    expect(result.current("title.hello")).toBe("title.hello");
  });

  it("returns key for unknown key and prefix", () => {
    const { result } = renderHook(
      () => useHooklation(translations, { prefix: "greeting" }),
      { wrapper: createWrapper("en") }
    );

    // @ts-expect-error We test an unknown key
    expect(result.current("wrong")).toBe("greeting.wrong");
  });

  it("returns translation", () => {
    const { result } = renderHook(() => useHooklation(translations), {
      wrapper: createWrapper("en"),
    });

    expect(result.current("title")).toBe("Welcome!");
    expect(result.current("greeting.hello")).toBe("Hello");
  });

  it("returns translation with prefix", () => {
    const { result } = renderHook(
      () => useHooklation(translations, { prefix: "greeting" }),
      { wrapper: createWrapper("en") }
    );

    expect(result.current("hello")).toBe("Hello");
  });
});
