import Axios from 'axios';
import { Topic } from '../models/Topic';

export const LoadTopicsFromApi = async () =>{
    return await (await Axios.get<Topic[]>("/api/topics")).data;
}