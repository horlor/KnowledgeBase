import axios from 'axios';
import Question, { PagedQuestions, QuestionWithAnswers, QuestionUpdateRequest, QuestionSearchRequest, QuestionSearchResult } from '../models/Question';
import Answer, { AnswerUpdateRequest } from '../models/Answer';
import { UrlBuilder } from '../helpers/UrlBuilder';

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

export const DeleteAnswer = async (questionId: number, answer: Answer) =>{
    await axios.delete(`/api/questions/${questionId}/answers/${answer.id}`);
}

export const UpdateAnswer = async (questionId: number, answerId: number,  request: AnswerUpdateRequest) =>{
    return (await axios.put(`/api/questions/${questionId}/answers/${answerId}`,request)).data;
}

export const UpdateQuestion = async (id : number, request: QuestionUpdateRequest) =>{
   return ( await axios.put(`/api/questions/${id}`,request)).data;
}

export const SearchQuestionsFromApi = async(request: QuestionSearchRequest) =>{
    let url = new UrlBuilder("/api/questions/search")
    url.appendWithQueryParam("anywhere",request.anywhere)
    url.appendWithQueryParam("title",request.title)
    url.appendWithQueryParam("content",request.content)
    url.appendWithQueryParam("topic",request.topic)
    url.appendWithQueryParam("page",request.page)
    console.log(url.get())
    return (await axios.get<QuestionSearchResult>(url.get())).data
}

export const CloseQuestion = async (questionId: number, answer: Answer) =>{
    await axios.post(`/api/questions/${questionId}/close`,answer);
}

export const ReopenQuestion = async (questionId: number, answer: Answer)=>{
    await axios.post(`/api/questions/${questionId}/reopen`,answer);
}