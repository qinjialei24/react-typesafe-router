import { QueryObject } from ".";

export function queryObjectToString(queryObject: QueryObject): string {
    return Object.entries(queryObject)
        .map(([key, value]) => `${key}=${value}`)
        .join("&");
}
