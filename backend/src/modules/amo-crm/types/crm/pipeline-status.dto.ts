export type PiplineStatusDto = {
    id: number,
    name: string,
    sort: number,
    is_editable: boolean,
    pipeline_id: number,
    color: string,
    type: number,
    account_id: number,
    _links: {
        self: {
        href: string
        }
    }
}