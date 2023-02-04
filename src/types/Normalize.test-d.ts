import { describe, expectTypeOf, it } from "vitest";
import { Normalize } from "./Normalize.js";

describe("Normalize", () => {
  it("without plural keys", () => {
    const obj = { a: "A", b: "B", c: { d: "D" } };
    expectTypeOf<Normalize<typeof obj>>().toMatchTypeOf<typeof obj>();
  });

  it("plural keys", () => {
    const obj = {
      a: { "=1": "1", ">=2": "2" },
      c: {
        d: { "=1": "1", ">=2": "2" },
      },
    };

    expectTypeOf<Normalize<typeof obj>>().toMatchTypeOf<{
      a: string;
      c: { d: string };
    }>();
  });
});
