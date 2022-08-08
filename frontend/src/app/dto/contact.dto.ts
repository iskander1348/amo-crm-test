import { LeadDto } from "./lead.dto";

export type ContactDto = {
    id: number;
    name: string;
    first_name: string;
    last_name: string;
    responsible_user_id: number;
    group_id: number;
    created_by: number;
    updated_by: number;
    created_at: number;
    updated_at: number;
    closest_task_at?: number;
    custom_fields_values?:  {
        field_id: number,
        field_name: string,
        field_code: "PHONE" | "EMAIL" | string,
        field_type: string,
        values: 
          {
            value: string,
            enum_id: number,
            enum_code: string
          }[]
      }[];
    account_id: number;
    _links: {
        self: {
            href: string;
        };
    };
    _embedded: {
        tags: [];
        companies: [];
        customers?: [];
        leads?: LeadDto[];
        catalog_elements?: [];
    };
}