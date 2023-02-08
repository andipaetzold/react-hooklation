import type { ComponentType, FunctionComponent } from "react";

/**
 * @see https://github.com/treyhuffine/is-react
 */
export function isClassComponent(
  component: unknown
): component is ComponentType {
  return (
    typeof component === "function" && !!component.prototype?.isReactComponent
  );
}

export function isFunctionComponent(
  component: unknown
): component is FunctionComponent {
  return typeof component === "function";
}
