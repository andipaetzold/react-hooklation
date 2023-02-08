[![npm](https://img.shields.io/npm/v/react-hooklation)](https://www.npmjs.com/package/react-hooklation)
[![downloads](https://img.shields.io/npm/dm/react-hooklation)](https://www.npmjs.com/package/react-hooklation)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-hooklation)](https://bundlephobia.com/package/react-hooklation)
[![tests](https://github.com/andipaetzold/react-hooklation/actions/workflows/push.yml/badge.svg?branch=main)](https://github.com/andipaetzold/react-hooklation/actions/workflows/push.yml?query=branch%3Amain)
[![license](https://img.shields.io/github/license/andipaetzold/react-hooklation)](https://github.com/andipaetzold/react-hooklation/blob/main/LICENSE)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

# React Hooklation

Lightweight, dependency-free and well-typed React internationalization library

> This library is in not stable yet and each version might contain a breaking change

## Installation

```sh
npm install react-hooklation
// or
yarn add react-hooklation
// or
pnpm add react-hooklation
```

## Compatibility

- [react](https://www.npmjs.com/package/react): 16.8.0 or later

## Usage

[Type Documentation](https://andipaetzold.github.io/react-hooklation)

`react-hooklation` does not detect or mange your current locale. Therefore, you need to provide the current locale at the root of your application: Wrap everything with `HooklationProvider` and pass the current locale.

```javascript
<HooklationProvider>...</HooklationProvider>
```

Within your components you can access translations using `useHooklation`:

```javascript
const en = {
  title: "Welcome",
  greeting: { hello: "Hello" },
};
const de = {
  title: "Willkommen",
  greeting: { hello: "Hallo" },
};

function Component() {
  const t = useHooklation({ en, de });

  return (
    <>
      <h1>{t("title")}</h1>
      <p>{t("greeting.hello")} Andi</p>
    </>
  );
}
```

### Plural

```javascript
const en = {
  potato: {
    "=1": "1 Potato",
    ">=2": "2+ Potatoes",
    ">=5": "Many Potatoes",
  },
};
const de = {
  potato: {
    "=1": "1 Kartoffel",
    ">=2": "2+ Kartoffeln",
    ">=5": "Viele Kartoffeln",
  },
};

function Component() {
  const t = useHooklation({ en, de });

  return (
    <ul>
      <li>{t("potato", { count: 1 })}</li> <!-- 1 potato -->
      <li>{t("potato", { count: 3 })}</li> <!-- 2+ potatoes -->
      <li>{t("potato", { count: 5 })}</li> <!-- Many potatoes -->
    </ul>
  );
}
```

Which translation is selected?

1. exact match (`=2` or `=50`)
2. ranged match (`>=2` or `>=50`) that starts closest to `count`

### Component-specific hooks

You don't have to import the translations into every single component when using `useHooklation`. Instead, you can create a component-specific hook using `createHooklationHook`:

Recommended folder structure

```
component/
├─ locale/
│  ├─ index.ts
│  ├─ de.ts
│  ├─ en.ts
├─ index.ts
├─ SubComponent.ts
```

```typescript
// component/locale/index.ts
import { createHooklationHook } from "react-hooklation";
import { en } from "./en";
import { de } from "./de";

const useLocalTranslation = createHooklationHook({ en, de });

// component/index.ts
import { useLocalTranslation } from "./locale";

const t = useLocalTranslation();
```

## Plugins

- [Interpolation](./src/plugins/interpolation)
- [React](./src/plugins/react)

## Development

### Build

To build the library, first install the dependencies, then run `npm run build`.

```sh
npm install
npm run build
```

### Tests

```sh
npm install
npm test          // Unit tests
npm run typecheck // TypeScript tests
```

## License

[MIT](LICENSE)
