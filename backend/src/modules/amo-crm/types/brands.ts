type Brand<K, T> = K & { readonly __brand: T };

export type AmoCrmAccessToken = Brand<string, "AmoCrmAccessToken">
export type AmoCrmClienId = Brand<string, "AmoCrmClienId">
export type AmoCrmClientSecret = Brand<string, "AmoCrmClientSecret">
export type AmoCrmRedirectUri = Brand<string, "AmoCrmRedirectUri">
export type AmoCrmDomain = Brand<string, "AmoCrmDomain">    
export type AmoCrmCode = Brand<string, "AmoCrmCode">
export type AmoCrmRefreshToken = Brand<string, "AmoCrmRefreshToken">

export type AmoResponse<T> = {
    
    _page?: number,
    _links: {
        self: {
            href: string
        },
        next?: {
            href: string
        },
        first?: {
            href: string
        },
        prev?: {
            href: string
        }
    },
    _total_items?: number,
    _embedded: T;
};