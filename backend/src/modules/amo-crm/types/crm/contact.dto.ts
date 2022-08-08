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
    custom_fields_values?: any[];
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