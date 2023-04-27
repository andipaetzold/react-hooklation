export interface Context {
  readonly count?: number | [number];
  readonly [vars: string]: unknown;
}
