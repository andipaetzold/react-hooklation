export type IsNever<T> = [T] extends [never] ? true : false;
export type ToString<T> = T & string;
export type Merge<TDefault, TCustom> = Omit<TDefault, keyof TCustom> & TCustom;

export type StringMapValue = StringMap | string;
export type StringMap = {
  [key: string]: StringMapValue;
};
