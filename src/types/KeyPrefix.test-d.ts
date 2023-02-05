import { describe, expectTypeOf, it } from "vitest";
import { KeyPrefix } from "./KeyPrefix";

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
