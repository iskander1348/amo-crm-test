export type UserDto = {
    id: number;
    name: string;
    email: string;
    lang: 'ru' | 'en' | 'es';
    rights: {
        leads: {
            view: string;
            edit: string;
            add: string;
            delete: string;
            export: string;
        };
        contacts: {
            view: string;
            edit: string;
            add: string;
            delete: string;
            export: string;
        };
        companies: {
            view: string;
            edit: string;
            add: string;
            delete: string;
            export: string;
        };
        tasks: {
            edit: string;
            delete: string;
        };
        mail_access: boolean;
        catalog_access: boolean;
        status_rights: any[];
        is_admin: boolean;
        is_free: boolean;
        is_active: boolean;
        group_id?: number;
        role_id?: number;
    };
    _links: {
        self: {
            href: string;
        };
    };
    _embedded: {
        roles: any[];
        groups: any[];
    };
}