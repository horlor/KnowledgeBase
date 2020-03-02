import axios from 'axios';
import Question from '../models/Question';
import QuestionWithAnswers from '../models/QuestionWithAnswers';
import Answer from '../models/Answer';

export const LoadQuestionsFromApi = async (): Promise<Question[]>=>{
    var response = await axios.get<Question[]>("/api/questions");
    return response.data;
}

export const LoadQuestionAnswerFromApi = async (id : number) : Promise<QuestionWithAnswers> =>{
    var response  = await axios.get<QuestionWithAnswers>(`/api/questions/${id}`);
    return response.data;
}

export const CreateAnswerToQuestion = async (id : number, answer: Answer) : Promise<Answer> =>{
    var response = await axios.post<Answer>(`/api/question/${id}/answers`, {content: answer});
    return response.data;
}