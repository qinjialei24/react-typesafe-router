import { describe, it, expect, vi } from "vitest";
import { createTypesafeRoute, useTypesafeNavigate, useTypesafeQuery } from ".";

const useNavigateMock = vi.fn();
const useSearchParamsMock = vi.fn(() => [new URLSearchParams("key=value")]);

vi.mock("react-router-dom", () => ({
  useNavigate: () => useNavigateMock,
  useSearchParams: () => useSearchParamsMock,
}));

describe("useTypesafeNavigate", () => {
  it("should call useNavigate with the correct path and query string", () => {
    const typesafeRoute = createTypesafeRoute({ path: "/test", element: null });
    const query = { key: "value" };

    const navigate = useTypesafeNavigate(typesafeRoute);
    navigate(query);

    expect(useNavigateMock).toHaveBeenCalledWith("/test?key=value");
  });
});

describe("useTypesafeQuery", () => {
  it.skip("should return the query params as a typed object", () => {
    const typesafeRoute = createTypesafeRoute({ path: "/test", element: null });

    const query = useTypesafeQuery(typesafeRoute);

    expect(query).toEqual({ key: "value" });
  });
});

describe("createTypesafeRoute", () => {
  it("should create a typesafe route with the given configuration", () => {
    const routeConfig = { path: "/test", element: null };

    const typesafeRoute = createTypesafeRoute(routeConfig);

    expect(typesafeRoute).toEqual({
      ...routeConfig,
      _query: {},
    });
  });
});
