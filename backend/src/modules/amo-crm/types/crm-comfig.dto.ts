import { AmoCrmClienId, AmoCrmClientSecret, AmoCrmCode, AmoCrmRedirectUri, AmoCrmDomain, AmoCrmRefreshToken } from "./brands";

export type AmoCrmConfig = {
    clienId: AmoCrmClienId;
    clientSecret: AmoCrmClientSecret;
    code: AmoCrmCode | undefined;
    redirectUri: AmoCrmRedirectUri;
    domain: AmoCrmDomain;
    refreshToken: AmoCrmRefreshToken | undefined
}