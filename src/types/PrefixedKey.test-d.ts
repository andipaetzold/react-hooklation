import { describe, expectTypeOf, it } from "vitest";
import { Key } from "./Key.js";
import { PrefixedKey } from "./PrefixedKey.js";

describe("PrefixedKey", () => {
  it("no prefix", () => {
    const obj = {
      a: "1",
      b: {
        c: "2",
        d: { e: "3" },
      },
    };

    expectTypeOf<PrefixedKey<typeof obj, never>>().toMatchTypeOf<
      Key<typeof obj>
    >();
  });

  it("prefix", () => {
    const obj = {
      a: "1",
      b: {
        c: "2",
        d: { e: "3" },
      },
    };

    expectTypeOf<PrefixedKey<typeof obj, "b">>().toMatchTypeOf<
      Key<typeof obj["b"]>
    >();
  });
});
