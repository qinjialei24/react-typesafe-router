import { ReactNode } from 'react';
type TypesafeRouteConfig = {
    path: string;
    element: ReactNode | null;
};
type QueryObject = Record<string, string | number>;
type TypesafeRoute<Query extends QueryObject> = {
    path: string;
    element: ReactNode | null;
    _query: Query;
};
export declare function useTypesafeNavigate<T extends TypesafeRoute<QueryObject>>(typesafeRoute: T): (query: T["_query"]) => void;
export declare function useTypesafeQuery<T extends TypesafeRoute<QueryObject>>(_typesafeRoute: T): T["_query"];
export declare function createTypesafeRoute<T extends QueryObject>(routeConfig: TypesafeRouteConfig): TypesafeRoute<T>;
export {};
//# sourceMappingURL=index.d.ts.map