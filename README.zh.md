[English](README.md) | [中文](README.zh.md)

# react-typesafe-router

在 React.js 中定义完全类型安全的路由最简单的方式。

![1726114162133](https://raw.githubusercontent.com/qinjialei24/react-typesafe-router/main/assets/react-typesafe-router.png)

## 使用方法

```bash
npm i react-typesafe-router
#or
pnpm i react-typesafe-router
```

### 定义你的类型安全路由

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

### 传递类型安全的路由查询数据

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

现在，您可以传递类型安全的路由查询数据！

![img.png](https://raw.githubusercontent.com/qinjialei24/react-typesafe-router/main/assets/img.png)

### 获取类型安全的路由查询数据

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

现在，您可以获取类型安全的路由查询数据！
![img_1.png](https://raw.githubusercontent.com/qinjialei24/react-typesafe-router/main/assets/img_1.png)
