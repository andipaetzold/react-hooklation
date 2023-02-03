import { get } from "./get.js";

// TODO: use SEPARATOR
const INTERPOLATION = /\{\{\s*(\w+(\.\w+)*)\s*\}\}/g;

export function interpolate(
  text: string,
  vars: Record<string, unknown>
): string {
  let result = "";

  let start = 0;
  let regExpResult: RegExpExecArray | null;
  while ((regExpResult = INTERPOLATION.exec(text))) {
    result += text.slice(start, regExpResult.index);
    result += resolve(regExpResult[1], vars);
    start = INTERPOLATION.lastIndex;
  }
  result += text.slice(start);

  return result;
}

function resolve(path: string, vars: Record<string, unknown>): string {
  return get(vars, path) ?? "";
}
