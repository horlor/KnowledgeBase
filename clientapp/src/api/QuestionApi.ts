import axios from 'axios';
import Question, { PagedQuestions, QuestionWithAnswers, QuestionUpdateRequest, QuestionSearchRequest, QuestionSearchResult } from '../models/Question';
import Answer, { AnswerUpdateRequest } from '../models/Answer';
import { UrlBuilder } from '../helpers/UrlBuilder';
import * as SignalR from "@microsoft/signalr"
import { ApiSettings } from './ApiSettings';

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
    return (await axios.post<Question>("/api/questions",question)).data;
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
    url.appendWithQueryParam("onlyHidden",request.onlyHidden)
    url.appendWithQueryParam("myquestions",request.myQuestions);
    url.appendWithQueryParam("countPerPage",request.pageSize)
    console.log(url.get())
    return (await axios.get<QuestionSearchResult>(url.get())).data
}

export const CloseQuestion = async (questionId: number, answer: Answer) =>{
    await axios.post(`/api/questions/${questionId}/close`,answer);
}

export const ReopenQuestion = async (questionId: number, answer: Answer)=>{
    await axios.post(`/api/questions/${questionId}/reopen`,answer);
}

export const HideQuestion = async(questionId: number, message: string)=>{
    return (await axios.post<Question>(`/api/questions/${questionId}/hide`, {moderatorMessage:message})).data;
}

export const UnhideQuestion = async(questionId: number)=>{
    return (await axios.post<Question>(`/api/questions/${questionId}/unhide`)).data;
}

export const HideAnswer = async(questionId: number, answerId: number, message: string)=>{
    return (await axios.post<Answer>(`/api/questions/${questionId}/answers/${answerId}/hide`,{moderatorMessage:message})).data
}

export const UnhideAnswer = async(questionId: number, answerId: number)=>{
    return (await axios.post<Answer>(`/api/questions/${questionId}/answers/${answerId}/unhide`)).data
}

class QuestionSignalrService{
    private connection? : SignalR.HubConnection;

    public async subscribe(questionId: number){
        this.connection =
			new SignalR.HubConnectionBuilder()
			.withUrl(ApiSettings.getUrl(["api","questionhub"]))
			.configureLogging(SignalR.LogLevel.Debug)
			.withAutomaticReconnect()
            .build();
        try{
            await this.connection?.start();
            await this.connection?.invoke("JoinQuestion",questionId);
        }
		catch(ex){
			console.log(ex);
		}

    }

    public async unsubscribe(questionId: number){
        if(this.connection && this.connection.state === SignalR.HubConnectionState.Connected){
            await this.connection.invoke("LeaveQuestion", questionId);
            await this.connection.stop();
            this.connection = undefined;
        }
    }

    public setOnNewAnswer(onNewAnswer:(answer: Answer) => void){
        if(this.connection)
            this.connection.on("NewAnswer",onNewAnswer);
    }

    public setOnAnswerEdited(onAnswerEdited: (answer: Answer) => void){
        if(this.connection)
            this.connection.on("AnswerEdited", onAnswerEdited);
    }

    public setOnAnswerDeleted(onAnswerDeleted: (answer: Answer)=> void){
        if(this.connection)
            this.connection.on("AnswerDeleted", onAnswerDeleted);
    }
    public setOnQuestionEdited(onQuestionEdited: (question: Question) => void){
        if(this.connection)
            this.connection.on("QuestionEdited",onQuestionEdited);
    }
    public setOnQuestionClosed(onQuestionClosed: (answer: Answer)=> void){
        if(this.connection)
            this.connection.on("QuestionClosed",onQuestionClosed);
    }
    public setOnQuestionReopened(onQuestionReopened: (answer: Answer)=> void){
        if(this.connection)
            this.connection.on("QuestionReopened",onQuestionReopened);
    }
}

export const QuestionService = new QuestionSignalrService();