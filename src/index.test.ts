import { describe, it, expect } from 'vitest';
import { createTypesafeRoute, useTypesafeNavigate, useTypesafeQuery } from './index';
import { renderHook } from '@testing-library/react-hooks';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

describe('Typesafe Navigation', () => {
  const routeConfig = {
    path: '/test',
    element: null,
  };

  const typesafeRoute = createTypesafeRoute<{ id: number }>(routeConfig);

  it('should create a typesafe route', () => {
    expect(typesafeRoute.path).toBe('/test');
    expect(typesafeRoute._query).toEqual({});
  });

  it('should navigate with typesafe query', () => {
    const { result } = renderHook(() => useTypesafeNavigate(typesafeRoute), {
      wrapper: ({ children }) => <MemoryRouter>{children}</MemoryRouter>,
    });

    const navigate = result.current;
    expect(() => navigate({ id: 123 })).not.toThrow();
  });

  it('should parse typesafe query', () => {
    const { result } = renderHook(() => useTypesafeQuery(typesafeRoute), {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={['/test?id=123']}>
          <Routes>
            <Route path="/test" element={children} />
          </Routes>
        </MemoryRouter>
      ),
    });

    const query = result.current;
    expect(query.id).toBe('123');
  });
});