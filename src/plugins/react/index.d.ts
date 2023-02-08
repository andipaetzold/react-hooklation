import type { ReactElement } from "react";
import "react-hooklation";

declare module "react-hooklation" {
  interface HooklationConfig {
    returnValue: string | ReactElement;
  }
}
