# React Plugin

## Installation

1. Add plugin to HooklationProvider

```jsx
<HooklationProvider locale={locale} plugins={[reactPlugin()]}>
  // App
</HooklationProvider>
```

2.  Add the following type declaration

```typescript
import type { ReactElement } from "react";
import "react-hooklation";

declare module "react-hooklation" {
  interface HooklationConfig {
    returnValue: string | ReactElement;
  }
}
```
