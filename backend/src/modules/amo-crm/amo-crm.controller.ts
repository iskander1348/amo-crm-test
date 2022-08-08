import { Controller, Get, Param, Query } from "@nestjs/common";
import { AmoCrmApiService } from "./providers/api.service";
import { ContactDto } from "./types/crm/contact.dto";
import { LeadDto } from "./types/crm/lead.dto";
import { PipelineDto } from "./types/crm/pipeline.dto";
import { UserDto } from "./types/crm/user.dto";

@Controller()
export class AmoCrmController{

    constructor(
        private readonly apiService: AmoCrmApiService
    ){}

    @Get("api/v1/leads")
    async getLeads(
        @Query("query") query: string,
        @Query("page") page: number,
        @Query("per_page") perPage: number
        ): Promise<
            LeadDto[]
        >{        
        const leadResponse = await this.apiService.getLeads({
            with: ["contacts"],
            page: page ?? 1,
            limit: perPage ?? 10,
            query: query.length > 0 ? query : undefined
        })

        return leadResponse._embedded.leads

    }

    @Get("api/v1/leads/pipelines")
    async getPipelines(): Promise<PipelineDto[]>{
        return (await this.apiService.getPipelines())._embedded.pipelines
    }

    @Get("api/v1/contact/:id")
    getContact(@Param("id") id: number): Promise<ContactDto>{
        return this.apiService.getContactById(id)
    }

    @Get("api/v1/users")
    async getUsers(): Promise<UserDto[]>{
        return (await this.apiService.getUsers({}))._embedded.users
    }

    @Get("api/v1/user/:id")
    getUser(@Param("id") id: number): Promise<UserDto>{
        return this.apiService.getUserById(id)
    }
}