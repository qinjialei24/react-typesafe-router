import {ReactNode,} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";

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

export function useTypesafeNavigate<T extends TypesafeRoute<QueryObject>>(
    typesafeRoute: T
) {
    const navigate = useNavigate();
    return (query: T["_query"]) => {
        navigate(`${typesafeRoute.path}?${queryObjectToString(query)}`);
    };
}

export function useTypesafeQuery<T extends TypesafeRoute<QueryObject>>(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _typesafeRoute: T
) {
    const [searchParams] = useSearchParams();
    const result: Record<string, string> = {};
    searchParams.forEach((value, key) => {
        result[key] = value;
    });
    return result as T["_query"];
}

export function createTypesafeRoute<T extends QueryObject>(
    routeConfig: TypesafeRouteConfig
): TypesafeRoute<T> {
    return {
        ...routeConfig,
        _query: {} as T,
    };
}

function queryObjectToString(queryObject: QueryObject): string {
    return Object.entries(queryObject)
        .map(([key, value]) => `${key}=${value}`)
        .join("&");
}
