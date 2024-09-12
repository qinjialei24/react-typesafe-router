import React from "react";
import { createBrowserRouter } from "react-router-dom";
import {
  createTypesafeRoute,
  useTypesafeNavigate,
  useTypesafeQuery,
} from "react-typesafe-router";
function Foo() {
  const navigateToBar = useTypesafeNavigate(barTypesafeRoute);
  return (
    <div>
      <button onClick={() => navigateToBar({ name: "jack" })}>Go to Bar</button>
    </div>
  );
}

function Bar() {
  const barQuery = useTypesafeQuery(barTypesafeRoute);
  const navigateToFoo = useTypesafeNavigate(fooTypesafeRoute);

  return (
    <div>
      <h3>name: {barQuery.name}</h3>
      <h3>age: {barQuery.age}</h3>
      <button onClick={() => navigateToFoo({ name: "jack" })}>Go to Foo</button>
    </div>
  );
}

const barTypesafeRoute = createTypesafeRoute<{ name: string; age?: number }>({
  path: "/bar",
  element: <Bar />,
});

const fooTypesafeRoute = createTypesafeRoute<{ name: string; age?: number }>({
  path: "/foo",
  element: <Foo />,
});

const router = createBrowserRouter([fooTypesafeRoute, barTypesafeRoute]);
