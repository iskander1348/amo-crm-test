import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { ContactDto } from "./dto/contact.dto";
import { LeadDto } from "./dto/lead.dto";
import { PipelineDto } from "./dto/pipeline.dto";
import { UserDto } from "./dto/user.dto";

const baseUrl = "http://localhost:3000"

@Injectable({
    providedIn: 'root'
  })
  export class AmoCrmService {
    constructor(private http: HttpClient) { }

    async getLeads(
       query: string | undefined,
       page: number,
       perPage: number
        ): Promise<
            LeadDto[]
        >{
          const params = {
            query: query ?? "",
            page: page ?? 1,
            per_page: perPage ?? 100
          }
          const response = await firstValueFrom(this.http.get<LeadDto[]>(`${baseUrl}/api/v1/leads`, { params: params}))
        return response
    }


    async getPipelines(): Promise<PipelineDto[]>{
       const response = await firstValueFrom(this.http.get<PipelineDto[]>(`${baseUrl}/api/v1/leads/pipelines`))
       return response
    }

    async getContact(id: number): Promise<ContactDto>{
       const response = await firstValueFrom(this.http.get<ContactDto>(`${baseUrl}/api/v1/contact/${id}`))
       return response
    }

    async getUsers(): Promise<UserDto[]>{
       const response = await firstValueFrom(this.http.get<UserDto[]>(`${baseUrl}/api/v1/users`))
       return response
    }


    async getUser(id: number): Promise<UserDto>{
       const response = await firstValueFrom(this.http.get<UserDto>(`${baseUrl}/api/v1/user/${id}`))
       return response
    }

}