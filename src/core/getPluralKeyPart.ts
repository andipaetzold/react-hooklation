import { PluralValueKeyPart } from "../types/index.js";

export function getPluralKeyPart(
  keyParts: string[],
  count: number
): PluralValueKeyPart | undefined {
  // exact match
  const exactMatch = `=${count}` as const;
  if (keyParts.includes(exactMatch)) {
    return exactMatch;
  }

  // range match
  const smallestRangeStart = keyParts
    .filter((keyPart) => !keyPart.startsWith("="))
    .map((rangeStart) => +rangeStart.slice(2))
    .filter((rangeStart) => !Number.isNaN(rangeStart))
    .sort()
    .reverse()
    .find((rangeStart) => rangeStart <= count);

  if (smallestRangeStart !== undefined) {
    return `>=${smallestRangeStart}`;
  }

  // no match
}
