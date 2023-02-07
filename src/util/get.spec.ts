import { get } from "./get.js";
import { describe, expect, it } from "vitest";

describe("get", () => {
  it("handles objects", () => {
    expect(get({ a: "1" }, "a")).toBe("1");
    expect(get({ a: { b: "2" } }, "a.b")).toBe("2");
  });

  it("handles arrays", () => {
    expect(get(["a", "b", "c"], "1")).toBe("b");
    expect(get({ a: ["a", "b", "c"] }, "a.1")).toBe("b");
  });

  it("returns undefined if invalid key", () => {
    expect(get({ a: "1" }, "b")).toBeUndefined();
    expect(get({ a: { b: "2" } }, "a.c")).toBeUndefined();
  });
});
