import { renderHook } from "@testing-library/react";
import { PropsWithChildren } from "react";
import { describe, expect, it, vi } from "vitest";
import { HooklationProvider } from "./HooklationProvider.js";
import { useHooklation } from "./useHooklation.js";

const translations = {
  en: {
    title: "Welcome!",
    greeting: {
      hello: "Hello",
    },
    potato: {
      "=1": "1 Potato",
      ">=2": "2+ Potatoes",
      ">=5": "Many Potatoes",
    },
    fullGreeting: "Hey {{ name }}",
  },
  de: {
    title: "Willkommen!", // title
    greeting: {
      hello: "Hallo", // greeting.hellp
    },
    potato: {
      "=1": "1 Kartoffel",
      ">=2": "2+ Kartoffeln",
      ">=5": "Viele Kartoffeln",
    },
    fullGreeting: "Hallo {{ name }}",
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
    // @ts-expect-error We test an unknown key
    expect(result.current("title.hello.andi")).toBe("title.hello.andi");
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

  it("returns plural form", () => {
    const { result } = renderHook(() => useHooklation(translations), {
      wrapper: createWrapper("de"),
    });

    expect(result.current("potato", { count: 1 })).toBe("1 Kartoffel");
    expect(result.current("potato", { count: 2 })).toBe("2+ Kartoffeln");
    expect(result.current("potato", { count: 3 })).toBe("2+ Kartoffeln");
    expect(result.current("potato", { count: 4 })).toBe("2+ Kartoffeln");
    expect(result.current("potato", { count: 5 })).toBe("Viele Kartoffeln");
    expect(result.current("potato", { count: 6 })).toBe("Viele Kartoffeln");
  });

  it("interpolates", () => {
    const { result } = renderHook(() => useHooklation(translations), {
      wrapper: createWrapper("de"),
    });

    expect(result.current("fullGreeting", { name: "Andi" })).toBe("Hallo Andi");
  });
});
