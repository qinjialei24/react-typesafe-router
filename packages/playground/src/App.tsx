import React from "react";
import {
  createTypesafeRoute,
  useTypesafeNavigate,
  useTypesafeQuery,
} from "react-typesafe-router";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

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

function Foo() {
  const navigateToBar = useTypesafeNavigate(barTypesafeRoute);
  return (
    <div>
      <h3>Hello Foo!</h3>
      <button onClick={() => navigateToBar({ name: "jack" })}>Go to Bar</button>
    </div>
  );
}

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

export function App() {
  return (
    <div>
      <React.StrictMode>
        <div style={{ paddingLeft: "400px" }}>
          <RouterProvider router={router} />
        </div>
      </React.StrictMode>
    </div>
  );
}
