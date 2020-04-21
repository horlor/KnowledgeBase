import Axios from 'axios';
import { Topic, TopicDetailed } from '../models/Topic';

export const LoadTopicsFromApi = async () =>{
    return (await Axios.get<Topic[]>("/api/topics")).data;
}

export const LoadTopicDetailedFromApi = async (id: number) =>{
    return (await Axios.get<TopicDetailed>(`/api/topics/${id}`)).data;
}

export const UpdateTopicApi = async (topic: TopicDetailed) =>{
    return await Axios.put(`/api/topics/${topic.id}`,topic);
}

