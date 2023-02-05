import { describe, expectTypeOf, it } from "vitest";
import { Key } from "./Key.js";

describe("Key", () => {
  it("single level", () => {
    const obj = { a: "1", b: "2" };

    expectTypeOf<Key<typeof obj>>().toMatchTypeOf<"a" | "b">();
  });

  it("multi level", () => {
    const obj = {
      a: "1",
      b: {
        c: "2",
        d: { e: "3" },
      },
    };

    expectTypeOf<Key<typeof obj>>().toMatchTypeOf<"a" | "b.c" | "b.d.e">();
  });

  it("plural", () => {
    const obj = {
      a: {
        "=1": "1",
        ">=2": "2",
      },
      b: {
        "=1": "1",
        ">=2": "2",
      },
      c: {
        d: {
          "=1": "1",
          ">=2": "2",
        },
      },
    };

    expectTypeOf<Key<typeof obj>>().toMatchTypeOf<"a" | "b" | "c.d">();
  });
});
