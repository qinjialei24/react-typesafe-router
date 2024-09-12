[English](README.md) | [中文](README.zh.md)

# react-typesafe-router

The easiest way to define full typesafe router in React.js. just 3 api you need to use. and the vue3 version is also available here (https://github.com/qinjialei24/vue-typesafe-router).

![1726114162133](https://raw.githubusercontent.com/qinjialei24/react-typesafe-router/main/assets/react-typesafe-router.png)

## Usage

```bash
npm i react-typesafe-router
#or
pnpm i react-typesafe-router
```

### Define your typesafe router

```tsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  createTypesafeRoute,
  useTypesafeNavigate,
  useTypesafeQuery,
} from "react-typesafe-router";

const barTypesafeRoute = createTypesafeRoute<{ name: string; age?: number }>({
  path: "/bar",
  element: <Bar />,
});

const fooTypesafeRoute = createTypesafeRoute<{ name: string; age?: number }>({
  path: "/foo",
  element: <Foo />,
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Foo />,
  },
  fooTypesafeRoute,
  barTypesafeRoute,
]);
```

### Pass route query data with full typesafe

```tsx
import { useTypesafeNavigate } from "react-typesafe-router";

function Foo() {
  const navigateToBar = useTypesafeNavigate(barTypesafeRoute);
  return (
    <div>
      <h3>Hello Foo!</h3>
      <button onClick={() => navigateToBar({ name: "jack" })}>Go to Bar</button>
    </div>
  );
}
```

Now, You can pass route query data with full typesafe!

![img.png](https://raw.githubusercontent.com/qinjialei24/react-typesafe-router/main/assets/img.png)

### Get route query data with full typesafe

```tsx
import { useTypesafeNavigate, useTypesafeQuery } from "react-typesafe-router";

function Bar() {
  const barQuery = useTypesafeQuery(barTypesafeRoute);
  const navigateToFoo = useTypesafeNavigate(fooTypesafeRoute);

  return (
    <div>
      <h3>Hello Bar!</h3>
      <h3>name: {barQuery.name}</h3>
      <h3>age: {barQuery.age}</h3>
      <button onClick={() => navigateToFoo({ name: "jack" })}>Go to Foo</button>
    </div>
  );
}
```

Now, You can get query data with full typesafe!
![img_1.png](https://raw.githubusercontent.com/qinjialei24/react-typesafe-router/main/assets/img_1.png)
