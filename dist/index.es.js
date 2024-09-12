import { useNavigate as u, useSearchParams as s } from "react-router-dom";
function i(e) {
  const r = u();
  return (t) => {
    r(`${e.path}?${o(t)}`);
  };
}
function f(e) {
  const [r] = s(), t = {};
  return r.forEach((a, n) => {
    t[n] = a;
  }), t;
}
function p(e) {
  return {
    ...e,
    _query: {}
  };
}
function o(e) {
  return Object.entries(e).map(([r, t]) => `${r}=${t}`).join("&");
}
export {
  p as createTypesafeRoute,
  i as useTypesafeNavigate,
  f as useTypesafeQuery
};
