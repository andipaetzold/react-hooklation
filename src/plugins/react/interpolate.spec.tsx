import { render } from "@testing-library/react";
import {
  Component,
  FunctionComponent,
  PropsWithChildren,
  ReactElement,
} from "react";
import { describe, expect, it } from "vitest";
import { interpolate } from "./interpolate.js";

describe("interpolate", () => {
  describe("self-closing", () => {
    it("without pops", () => {
      const Name: FunctionComponent = () => <span>Andi</span>;
      const element = interpolate("Hello <Name />", { Name }) as ReactElement;
      const { container } = render(element);
      expect(container).toMatchInlineSnapshot(`
        <div>
          Hello 
          <span>
            Andi
          </span>
        </div>
      `);
    });

    it("with props", () => {
      const Name: FunctionComponent<{ target: string }> = ({ target }) => (
        <a target={target} href="https://github.com/andipaetzold">
          Andi
        </a>
      );
      const element = interpolate("Hello <Name />", {
        Name,
        target: "_blank",
      }) as ReactElement;
      const { container } = render(element);
      expect(container).toMatchInlineSnapshot(`
        <div>
          Hello 
          <a
            href="https://github.com/andipaetzold"
            target="_blank"
          >
            Andi
          </a>
        </div>
      `);
    });

    it("without component", () => {
      const element = interpolate("Hello <Name />", {});
      expect(element).toMatchInlineSnapshot('"Hello <Name />"');
    });

    it("without wrong component type", () => {
      const element = interpolate("Hello <Name />", {
        Name: "Andi",
      });
      expect(element).toMatchInlineSnapshot('"Hello <Name />"');
    });

    it("with class-based component", () => {
      class Name extends Component {
        render() {
          return <span>Andi</span>;
        }
      }
      const element = interpolate("Hello <Name />", {
        Name,
        target: "_blank",
      }) as ReactElement;
      const { container } = render(element);
      expect(container).toMatchInlineSnapshot(`
        <div>
          Hello 
          <span>
            Andi
          </span>
        </div>
      `);
    });

    it("nested", () => {
      const Name: FunctionComponent = () => <span>Andi</span>;
      const element = interpolate("Hello <person.name />", {
        person: { name: Name },
      }) as ReactElement;
      const { container } = render(element);
      expect(container).toMatchInlineSnapshot(`
          <div>
            Hello 
            <span>
              Andi
            </span>
          </div>
        `);
    });
  });

  describe("open-close", () => {
    it("passes children", () => {
      const Name: FunctionComponent = ({ children }) => <b>{children}</b>;
      const element = interpolate("Hello <Name>Andi</Name>", {
        Name,
      }) as ReactElement;
      const { container } = render(element);
      expect(container).toMatchInlineSnapshot(`
    <div>
      Hello 
      <b>
        Andi
      </b>
    </div>
  `);
    });

    it("nested", () => {
      const Name: FunctionComponent<PropsWithChildren> = ({ children }) => (
        <b>{children}</b>
      );
      const Link: FunctionComponent<PropsWithChildren> = ({ children }) => (
        <a href="https://github.com/andipaetzold">{children}</a>
      );
      const element = interpolate("<Link>Hello <Name>Andi</Name></Link>", {
        Name,
        Link,
      }) as ReactElement;
      const { container } = render(element);
      expect(container).toMatchInlineSnapshot(`
        <div>
          <a
            href="https://github.com/andipaetzold"
          >
            Hello 
            <b>
              Andi
            </b>
          </a>
        </div>
      `);
    });

    it("as siblings", () => {
      const Name: FunctionComponent = ({ children }) => <b>{children}</b>;
      const element = interpolate(
        "Hello <Name>Andi</Name> and <Name>Viola</Name>",
        {
          Name,
        }
      ) as ReactElement;
      const { container } = render(element);
      expect(container).toMatchInlineSnapshot(`
        <div>
          Hello 
          <b>
            Andi
          </b>
           and 
          <b>
            Viola
          </b>
        </div>
      `);
    });

    it("without component", () => {
      const element = interpolate(
        "Hello <Name>Andi</Name>",
        {}
      ) as ReactElement;
      const { container } = render(element);
      expect(container).toMatchInlineSnapshot(`
        <div>
          Hello &lt;Name&gt;Andi&lt;/Name&gt;
        </div>
      `);
    });
  });

  it("open-close & self-closing", () => {
    const Name: FunctionComponent<PropsWithChildren> = () => <b>Andi</b>;
    const Link: FunctionComponent<PropsWithChildren> = ({ children }) => (
      <a href="https://github.com/andipaetzold">{children}</a>
    );
    const element = interpolate("<Link>Hello <Name /></Link>", {
      Name,
      Link,
    }) as ReactElement;
    const { container } = render(element);
    expect(container).toMatchInlineSnapshot(`
      <div>
        <a
          href="https://github.com/andipaetzold"
        >
          Hello 
          <b>
            Andi
          </b>
        </a>
      </div>
    `);
  });
});
