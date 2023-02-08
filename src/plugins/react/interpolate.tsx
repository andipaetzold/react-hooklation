import { Fragment, ReactElement } from "react";
import { get } from "../../util/get.js";
import { isClassComponent, isFunctionComponent } from "./util.js";

export function interpolate(
  text: string,
  vars: Record<string, unknown>
): ReactElement | string {
  const resultParts = interpolateOpenAndClosing(text, vars);

  return flatten(resultParts);
}

function interpolateOpenAndClosing(
  text: string,
  vars: Record<string, unknown>
): (ReactElement | string)[] {
  const parts: (ReactElement | string)[] = [];
  let regExpResult: RegExpExecArray | null;

  let start = 0;
  const TAGS = /\<\s*(?<tag>\w+(\.\w+)*)\s*\>(?<children>.*?)\<\/\s*\1\s*\>/g;
  while ((regExpResult = TAGS.exec(text))) {
    parts.push(text.slice(start, regExpResult.index));

    const fallback = regExpResult[0];
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const children = regExpResult.groups!.children;
    const interpolatedChildren = interpolateOpenAndClosing(children, vars);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const element = createElement(regExpResult.groups!.tag, {
      ...vars,
      children: flatten(interpolatedChildren),
    });
    parts.push(element ?? fallback);

    start = TAGS.lastIndex;
  }
  parts.push(text.slice(start));

  return parts.flatMap((part) =>
    typeof part === "string" ? interpolateSelfClosing(part, vars) : [part]
  );
}

function interpolateSelfClosing(
  text: string,
  vars: Record<string, unknown>
): (ReactElement | string)[] {
  const result: (ReactElement | string)[] = [];
  let regExpResult: RegExpExecArray | null;
  let start = 0;
  const SELF_CLOSING = /\<\s*(?<tag>\w+(\.\w+)*)\s*\/\>/g;
  while ((regExpResult = SELF_CLOSING.exec(text))) {
    result.push(text.slice(start, regExpResult.index));

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const element = createElement(regExpResult.groups!.tag, vars);
    const fallback = regExpResult[0];
    result.push(element ?? fallback);

    start = SELF_CLOSING.lastIndex;
  }
  result.push(text.slice(start));

  return result;
}

function createElement(
  path: string,
  vars: Record<string, unknown>
): ReactElement | string | undefined {
  const Component = get(vars, path);
  if (!isClassComponent(Component) && !isFunctionComponent(Component)) {
    return undefined;
  }

  return <Component {...vars} />;
}

function flatten(parts: (ReactElement | string)[]): ReactElement | string {
  if (parts.every((part) => typeof part === "string")) {
    return parts.join("");
  }
  return (
    <>
      {parts.map((part, partIndex) => (
        <Fragment key={partIndex}>{part}</Fragment>
      ))}
    </>
  );
}
