export interface SearchRecord{
	title: string,
	link: string,
	type: SearchRecordType
}

export enum SearchRecordType{
	search,
	question,
	user,
}