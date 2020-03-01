import axios from 'axios';
import Question from '../models/Question';

export const LoadQuestionsFromApi = async (): Promise<Question[]>=>{
    var response = await axios.get<Question[]>("/api/quesions");
    return response.data;
}