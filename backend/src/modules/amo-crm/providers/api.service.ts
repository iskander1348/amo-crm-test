import { Injectable } from "@nestjs/common";
import { HttpService} from "@nestjs/axios"
import { AxiosRequestConfig } from "axios";
import { AmoCrmAccessToken, AmoCrmDomain, AmoResponse } from "src/modules/amo-crm/types/brands";
import { LeadDto } from "src/modules/amo-crm/types/crm/lead.dto";
import { AmoCrmConfigService } from "./config.service";
import { AmoCrmOauthService } from "./oauth.service";
import { PipelineDto } from "../types/crm/pipeline.dto";
import { ContactDto } from "../types/crm/contact.dto";
import { UserDto } from "../types/crm/user.dto";

@Injectable()
export class AmoCrmApiService{
    

    constructor(
        private readonly authService: AmoCrmOauthService,
        private readonly configService: AmoCrmConfigService,
        private readonly httpService: HttpService
    ){}

    async getLeads(
        params: {
            with?: (
                | 'catalog_elements'
                | 'is_price_modified_by_robot'
                | 'loss_reason'
                | 'only_deleted'
                | 'contacts'
                | 'source_id'
            )[];
            page?: number;
            limit?: number;
            query?: string | number;
            filter?: any;
            sort?: any;
        },
    ): Promise<AmoResponse<{ leads: LeadDto[] }>> {
        const accessToken = await this.authService.getAccessToken()
        const url = `${this.configService.config.domain}/api/v4/leads`;
        const requestConfig: AxiosRequestConfig = {
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                Authorization: `Bearer ${ accessToken }`,
            },
        };
        requestConfig.params = params;
        if (params.with && params.with.length > 0) requestConfig.params.with = params.with.toString();
        else params.with = undefined;
        try {
            const response = 
                await this.httpService.axiosRef.get<AmoResponse<{ leads: LeadDto[] }>>(url, requestConfig);
            return response.data
        } catch (error) {
            throw error;
        }
    }

    async getPipelines(): Promise<AmoResponse<{ pipelines: PipelineDto[] }>>{
        const accessToken = await this.authService.getAccessToken()
        const url = `${this.configService.config.domain}/api/v4/leads/pipelines`;
        const requestConfig: AxiosRequestConfig = {
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                Authorization: `Bearer ${ accessToken }`,
            },
        };
        
        try {
            const response = 
                await this.httpService.axiosRef.get<AmoResponse<{ pipelines: PipelineDto[] }>>(url, requestConfig);

            return response.data;
        } catch (error) {
            throw error;
        }
        //
    }

    async getContactById(
        id: number
    ): Promise<ContactDto> {
        const accessToken = await this.authService.getAccessToken()
        const url = `${this.configService.config.domain}/api/v4/contacts/${id}`
        const requestConfig: AxiosRequestConfig = {
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                Authorization: `Bearer ${ accessToken }`,
            },
        };
        try {
            const response = await this.httpService.axiosRef.get<ContactDto>(url, requestConfig);
            return response.data;
        } catch (error) {            
            throw error;
        }
    }

    async getUsers(
        params: {
            with?: ('role' | 'group' | 'uuid' | 'amojo_id')[];
            page?: number;
            limit?: number;
        }
    ): Promise<AmoResponse<{ users: UserDto[] }>> { 
        const accessToken = await this.authService.getAccessToken()
        const url = `${this.configService.config.domain}/api/v4/users`
        const requestConfig: AxiosRequestConfig = {
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                Authorization: `Bearer ${ accessToken }`,
            },
        };
        requestConfig.params = params;
        if (params.with && params.with.length > 0) requestConfig.params.with = params.with.toString();
        else params.with = undefined;
        try {
            const response = await
                this.httpService.axiosRef.get<AmoResponse<{ users: UserDto[] }>>(url, requestConfig);
            
            
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async getUserById(
        id: number,
    ): Promise<UserDto> {
        const accessToken = await this.authService.getAccessToken()
        const url = `${this.configService.config.domain}/api/v4/users/${ id }`
        const requestConfig: AxiosRequestConfig = {
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                Authorization: `Bearer ${ accessToken }`,
            },
        };
        try {
            const response = await this.httpService.axiosRef.get<UserDto>(url, requestConfig);
           
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}