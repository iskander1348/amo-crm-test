import { Injectable } from '@nestjs/common';
import { AmoCrmAccessToken } from 'src/modules/amo-crm/types/brands';
import { GetOauthRequest } from 'src/modules/amo-crm/types/get-oauth-request.dto';
import { RefreshTokenRequest } from 'src/modules/amo-crm/types/refresh-token-request.dto';
import { AmoCrmTokenResponse } from 'src/modules/amo-crm/types/token-response.dto';
import { AmoCrmConfigService } from './config.service';
import * as qs from "qs";
import { HttpService } from '@nestjs/axios';




@Injectable()
export class AmoCrmOauthService{

    private accessToken!: AmoCrmAccessToken;
    private expiresIn: number = 1;

    constructor(
        private readonly configService: AmoCrmConfigService,
        
        private readonly httpService: HttpService
    ){
            // this.getAccessToken()
        
    }

    async getAccessToken(): Promise<AmoCrmAccessToken>{
        if (!this.configService.config.refreshToken){
            const exchangeData = await this.exchangeOauthCode();
            this.configService.updateRefreshToken(exchangeData.refresh_token)
            this.accessToken = exchangeData.access_token;
            this.expiresIn = new Date().getTime() + exchangeData.expires_in * 1000
        }
        if (new Date().getTime() > this.expiresIn){
            
            const refreshData = await this.refreshAccessToken()
            this.accessToken = refreshData.access_token
            this.expiresIn = new Date().getTime() + refreshData.expires_in * 1000
        }
        return this.accessToken
    }

    private async exchangeOauthCode(): Promise<AmoCrmTokenResponse> {
        if (!this.configService.config.code) throw new Error("no oauth code specified")
        const url = `${this.configService.config.domain}/oauth2/access_token`
        const headers = {
            'content-type': 'application/x-www-form-urlencoded',
        };
        const body: GetOauthRequest = {
            grant_type: "authorization_code",
            code: this.configService.config.code,
            redirect_uri: this.configService.config.redirectUri,
            client_id: this.configService.config.clienId,
            client_secret: this.configService.config.clientSecret,
        };

        try {
            const response = this.httpService.axiosRef.post<AmoCrmTokenResponse>(url, qs.stringify(body), {
                headers,
            });
            const oauth = (await response).data;
            return oauth;
        } catch (error) {
            console.log({error})
            throw error;
        }
    }

    private async refreshAccessToken(): Promise<AmoCrmTokenResponse> {
        if (!this.configService.config.refreshToken) throw new Error("no refresh token specified")
        const url = `${this.configService.config.domain}/oauth2/access_token`
        const headers = {
            'content-type': 'application/x-www-form-urlencoded',
        };
        const body: RefreshTokenRequest = {
            grant_type: "refresh_token",
            redirect_uri: this.configService.config.redirectUri,
            client_id: this.configService.config.clienId,
            client_secret: this.configService.config.clientSecret,
            refresh_token: this.configService.config.refreshToken,
        };

        try {
            const response = this.httpService.axiosRef.post<AmoCrmTokenResponse>(url, qs.stringify(body), {
                headers,
            });
            const oauth = (await response).data;
            this.configService.updateRefreshToken(oauth.refresh_token)
            return oauth;
        } catch (error) {
            
            console.log({error: error.response.data})
            throw error;
        }
    }
}