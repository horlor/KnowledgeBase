import axios from 'axios';
import Question, { PagedQuestions } from '../models/Question';
import QuestionWithAnswers from '../models/QuestionWithAnswers';
import Answer from '../models/Answer';
import { rejects } from 'assert';

export const LoadQuestionsFromApi = async (pageNum = 1, pageSize = 10): Promise<PagedQuestions>=>{
    var response = await axios.get<PagedQuestions>(`/api/questions?pagenum=${pageNum}&pageSize=${pageSize}`);
    return response.data;
}

export const LoadQuestionAnswerFromApi = async (id : number) : Promise<QuestionWithAnswers> =>{
    var response  = await axios.get<QuestionWithAnswers>(`/api/questions/${id}`);
    return response.data;
}

export const CreateAnswerToQuestion = async (id : number, answer: Answer) : Promise<Answer> =>{
    var response = await axios.post<Answer>(`/api/questions/${id}/answers`, answer);
    return response.data;
}