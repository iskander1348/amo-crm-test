import { AmoCrmAccessToken, AmoCrmRefreshToken } from "./brands";


export type AmoCrmTokenResponse = {
    token_type: string;
    expires_in: number;
    access_token: AmoCrmAccessToken;
    refresh_token: AmoCrmRefreshToken;
}