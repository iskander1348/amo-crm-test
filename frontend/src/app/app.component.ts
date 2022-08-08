import { query } from '@angular/animations';
import { Component } from '@angular/core';
import { AmoCrmService } from './amo-crm.service';
import { ContactDto } from './dto/contact.dto';
import { LeadDto } from './dto/lead.dto';
import { PipelineDto } from './dto/pipeline.dto';
import { UserDto } from './dto/user.dto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private readonly amoCrm: AmoCrmService
  ){
  }

  ngOnInit(){
    this.getLeads()
    this.amoCrm.getUsers().then(data => this.users = data)
    this.amoCrm.getPipelines().then(data => this.pipelines = data)
  }

  isLoading = true;
  searchString: string = "";
  prevSearchLength: number = 0;
  leads: LeadDto[] = [];
  contacts: ContactDto[] = [];
  users: UserDto[] = [];
  pipelines: PipelineDto[] = []

  searchLeads(){

    console.log(this.prevSearchLength)
    if (this.searchString.length >= 3){

      this.prevSearchLength = this.searchString.length
      this.getLeads()
      
    }
    if (this.prevSearchLength > 0 && this.searchString.length === 0){

      this.prevSearchLength = 0
      this.getLeads()
      
    }
  }

  async getLeads(){
    this.leads = []
    let page = 1;
    const perPage = 100;
    let isMoreLeads = true;
    const query = this.searchString.length >= 3 ? this.searchString : ""
    while (isMoreLeads){
      isMoreLeads = false;
      try{
        const leads = await this.amoCrm.getLeads(
          query,
          page,
          perPage
        )
        leads.forEach(lead => this.getAssociatedContacts(lead))
        console.log(leads)
        this.leads = [...this.leads, ...leads]
        isMoreLeads = true
        page += 1
      }
      catch(err){
        console.log("all leads loaded!")
      }
      
    }
  }

  showPipelineName(lead: LeadDto): string{
    const pipeline = this.pipelines.find(i => lead.pipeline_id === i.id)
    return pipeline ? pipeline.name : "Неизвестная воронка"
  }

  showStatusNameAndColor(lead: LeadDto): {name: string, color: string} {
    const pipeline = this.pipelines.find(i => lead.pipeline_id === i.id)
    if (!pipeline) return {name: "Неизвестный статус", color: "white"}
    const status = pipeline._embedded.statuses.find(i => i.id === lead.status_id)
    return status ? {name: status.name, color: status.color} : {name: "Неизвестный статус", color: "white"}
  }

  showUserName(lead: LeadDto): string {
    let user = this.users.find(i => i.id === lead.responsible_user_id)
    return user ? user.name : "Неизвестный пользователей"
  }

  showCreatedDate(lead: LeadDto): Date {
    return new Date(lead.created_at * 1000)
  }

  async getAssociatedContacts(lead: LeadDto): Promise<void>{
    if (lead._embedded.contacts)
    for (const associatedContact of lead._embedded.contacts){
      if (!this.contacts.find(i => i.id === associatedContact.id)){
        try{
          const contact = await this.amoCrm.getContact(associatedContact.id)
          if (!this.contacts.find(i => i.id === contact.id)) this.contacts.push(contact)
        }
        catch(error){
          console.log(error)
        }        
      }
    }    
  }

  showAssociatedContacts(lead: LeadDto): ContactDto[]{
    if (!lead._embedded.contacts) return []
    const ids: number[] = []
    for (const contact of lead._embedded.contacts){
      ids.push(contact.id)
    }
    return  this.contacts.filter(
      i => ids.includes(i.id)
    )
  }


  getContactPhones(contact: ContactDto): string[]{
    if (!contact.custom_fields_values) return[]
    const phones: string[] = []
    for (const customField of contact.custom_fields_values){
      if (customField.field_code === "PHONE"){
        for (const value of customField.values){
          if (!phones.includes(value.value)){
            phones.push(`+${value.value.replace(/\D/g, "")}`)
          }
            
        }
      }
    }
    return phones
  }

  getContactEmails(contact: ContactDto): string[]{
    if (!contact.custom_fields_values) return[]
    const emails: string[] = []
    for (const customField of contact.custom_fields_values){
      if (customField.field_code === "EMAIL"){
        for (const value of customField.values){
          if (!emails.includes(value.value))
            emails.push(value.value)
        }
      }
    }
    return emails
  }


}
