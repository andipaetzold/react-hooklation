import { renderHook } from "@testing-library/react";
import { PropsWithChildren } from "react";
import { expect, it } from "vitest";
import { createHooklationHook } from "./createHooklationHook.js";
import { HooklationProvider } from "./provider.js";

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

it("creates a custom hook", () => {
  const useLocalTranslation = createHooklationHook(translations);
  const { result } = renderHook(() => useLocalTranslation(), {
    wrapper: createWrapper("en"),
  });

  expect(result.current.t("title")).toBe("Welcome!");
});
