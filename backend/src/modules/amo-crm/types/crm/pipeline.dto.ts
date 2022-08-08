import { PiplineStatusDto } from "./pipeline-status.dto"

export type PipelineDto = {
	id: number,
	name: string,
	sort: number,
	is_main: boolean,
	is_unsorted_on: boolean,
	is_archive: boolean,
	account_id: number,
	_links: {
		self: {
			href: string
		}
	},
	_embedded: {
		statuses: PiplineStatusDto[]
	}
}