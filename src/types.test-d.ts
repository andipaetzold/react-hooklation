import { describe, it, expectTypeOf } from "vitest";
import { Key, KeyPrefix, PrefixedKey } from "./types.js";

describe("Keys", () => {
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
});

describe("KeyPrefix", () => {
  it("single level", () => {
    const obj = { a: "1", b: "2" };

    expectTypeOf<KeyPrefix<typeof obj>>().toMatchTypeOf<never>();
  });

  it("multi level", () => {
    const obj = {
      a: "1",
      b: {
        c: "2",
        d: { e: "3" },
        f: { g: "3" },
      },
    };

    expectTypeOf<KeyPrefix<typeof obj>>().toMatchTypeOf<"b" | "b.d" | "b.f">();
  });
});

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
