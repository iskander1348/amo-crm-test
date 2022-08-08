import { AmoCrmClienId, AmoCrmClientSecret, AmoCrmRedirectUri, AmoCrmRefreshToken } from "./brands";

export type RefreshTokenRequest = {
    grant_type: "refresh_token";
    redirect_uri: AmoCrmRedirectUri;
    client_id: AmoCrmClienId;
    client_secret: AmoCrmClientSecret;
    refresh_token: AmoCrmRefreshToken;
}