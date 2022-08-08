import { AmoCrmClienId, AmoCrmClientSecret, AmoCrmCode, AmoCrmRedirectUri } from "./brands";

export type GetOauthRequest = {
    grant_type: "authorization_code";
    code: AmoCrmCode;
    redirect_uri: AmoCrmRedirectUri;
    client_id: AmoCrmClienId;
    client_secret: AmoCrmClientSecret;
}