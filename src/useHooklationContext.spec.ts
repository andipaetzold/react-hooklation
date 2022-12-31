import { renderHook } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import { useHooklationContext } from "./useHooklationContext.js";

it("throws outside of HooklationProvider", () => {
  const originalError = console.error;
  console.error = vi.fn();

  expect(() => renderHook(() => useHooklationContext())).toThrow();

  console.error = originalError;
});
