export interface Topic{
    id: number,
    name: string,
}

export interface TopicDetailed extends Topic{
    ancestor: Topic | null
}