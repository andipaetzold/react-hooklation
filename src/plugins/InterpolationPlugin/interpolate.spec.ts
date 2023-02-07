import { describe, expect, it } from "vitest";
import { interpolate } from "./interpolate.js";

describe("interpolate", () => {
  it("single level", () => {
    expect(interpolate("Hello {{ name }}", { name: "Andi" })).toBe(
      "Hello Andi"
    );
    expect(interpolate("Hello {{name}}", { name: "Andi" })).toBe("Hello Andi");
    expect(
      interpolate("{{ greeting }} {{ name }}", {
        greeting: "Hello",
        name: "Andi",
      })
    ).toBe("Hello Andi");
  });

  it("nested", () => {
    expect(
      interpolate("Hello {{ person.name }}", { person: { name: "Andi" } })
    ).toBe("Hello Andi");
    expect(
      interpolate("Hello {{ people.1.name }}", {
        people: [{ name: "Bob" }, { name: "Andi" }],
      })
    ).toBe("Hello Andi");
  });
});
