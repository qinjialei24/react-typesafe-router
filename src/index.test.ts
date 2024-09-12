import { renderHook } from "@testing-library/react-hooks";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import {
  createTypesafeRoute,
  useTypesafeNavigate,
  useTypesafeQuery,
} from "./index";
import { describe, it } from "vitest";

describe("react-typesafe-router", () => {
  const fooTypesafeRoute = createTypesafeRoute<{ name: string; age?: number }>({
    path: "/foo",
    element: null,
  });

  const barTypesafeRoute = createTypesafeRoute<{ name: string; age?: number }>({
    path: "/bar",
    element: null,
  });

  it("useTypesafeNavigate should navigate with query parameters", () => {
    const router = createMemoryRouter([
      {
        path: "/",
        element: null,
      },
      fooTypesafeRoute,
      barTypesafeRoute,
    ]);
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <RouterProvider router={router}>{children}</RouterProvider>
    );

    const { result } = renderHook(() => useTypesafeNavigate(barTypesafeRoute), {
      wrapper,
    });

    result.current({ name: "jack", age: 30 });

    expect(router.state.location.pathname).toBe("/bar");
    expect(router.state.location.search).toBe("?name=jack&age=30");
  });

  it("useTypesafeQuery should return query parameters", () => {
    const router = createMemoryRouter(
      [
        {
          path: "/",
          element: null,
        },
        fooTypesafeRoute,
        barTypesafeRoute,
      ],
      {
        initialEntries: ["/bar?name=jack&age=30"],
      }
    );

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <RouterProvider router={router}>{children}</RouterProvider>
    );

    const { result } = renderHook(() => useTypesafeQuery(barTypesafeRoute), {
      wrapper,
    });

    expect(result.current).toEqual({ name: "jack", age: "30" });
  });
});
