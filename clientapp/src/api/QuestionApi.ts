import axios from 'axios';
import Question, { PagedQuestions, QuestionWithAnswers } from '../models/Question';
import Answer from '../models/Answer';

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

export const CreateQuestionToApi = async (question: Question) => {
    await axios.post("/api/questions",question);
}

export const DeleteQuestion = async (question: Question) => {
    await axios.delete(`/api/questions/${question.id}`);
}

export const DeleteAnswer = async (question: Question, answer: Answer) =>{
    await axios.delete(`/api/questions/${question.id}/answers/${answer.id}`);
}