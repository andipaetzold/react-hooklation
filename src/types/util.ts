export type IsNever<T> = [T] extends [never] ? true : false;
export type ToString<T> = T & string;
export type Merge<TDefault, TCustom> = Omit<TDefault, keyof TCustom> & TCustom;
