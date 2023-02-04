export interface HooklationPlugin {
  events?: {
    [T in keyof HooklationEventDetails]?: (
      detail: HooklationEventDetails[T]
    ) => void;
  };
}

export interface HooklationEventDetails {
  missingKey: { locale: string; key: string };
  missingLocale: { locale: string };
}

export interface HooklationEventEmitter {
  <T extends keyof HooklationEventDetails>(
    event: T,
    detail: HooklationEventDetails[T]
  ): void;
}
