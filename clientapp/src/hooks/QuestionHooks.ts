import {useSelector, useDispatch, shallowEqual} from "react-redux";
import { RootState } from "../redux/Store";
import { LoadQuestionAnswerFromApi, CreateQuestionToApi, DeleteQuestion, UpdateQuestion, SearchQuestionsFromApi, ReopenQuestion, CloseQuestion, QuestionService, HideQuestion, UnhideQuestion } from "../api/QuestionApi";
import { useEffect, useState } from "react";
import { FetchQuestionsStarted, FetchQuestionsSuccess, FetchQuestionsFailure, FetchQAStarted, FetchQASuccess, FetchQAFailure, DeleteQuestionAction, DeleteAnswerAction, UpdateQuestionAction, AddAnswerAction, UpdateAnswerAction, CloseQuestionAction, ReopenQuestionAction, FetchMoreQuestions } from "../redux/reducers/QuestionReducer";
import ErrorModel from "../models/ErrorModel";
import { CatchIntoErrorModel } from "../helpers/ErrorHelpers";
import { Topic } from "../models/Topic";
import { LoadTopicsThunk } from "../redux/reducers/TopicThunks";
import Question, { QuestionUpdateRequest, QuestionSearchResult, QuestionType } from "../models/Question";
import Answer from "../models/Answer";
import { LoadQuestionAnswersThunk } from "../redux/reducers/QuestionThunks";
import { useHistory } from "react-router";
import { UrlBuilder } from "../helpers/UrlBuilder";
import { OperationFailedAction, OperationStartedAction, OperationSuccessAction } from "../redux/reducers/OperationReducer";


export const useSearchQuestionsHook = () =>{
    var result = useSelector((state : RootState) => state.question.result);
    var error = useSelector((state: RootState) => state.question.error);
    var loading = useSelector((state: RootState) => state.question.loading);
    var username = useSelector((state: RootState) => state.login.username);
    const history = useHistory();
    const queryParams = new URLSearchParams(history.location.search);
    const anywhere = queryParams.get("anywhere"), title = queryParams.get("title"), content = queryParams.get("content"), topicstr = queryParams.get("topic"),
    topic = topicstr?parseInt(topicstr):null, page = parseInt(queryParams.get("page") || "1")
    var dispatch = useDispatch();

    function onSearch(anywhere: string | null, content:string | null,
        title:string| null, topic:number| null){
       let builder = new UrlBuilder("/questions");
       builder.appendWithQueryParam("anywhere", anywhere)
       builder.appendWithQueryParam("content",content)
       builder.appendWithQueryParam("title",title)
       builder.appendWithQueryParam("topic",topic)
       history.push(builder.get())
   }

   function onPageChanged(from: number, to: number){
    let builder = new UrlBuilder("/my_questions")
    builder.appendWithQueryParam("anywhere",anywhere)
    builder.appendWithQueryParam("title",title)
    builder.appendWithQueryParam("content",content)
    builder.appendWithQueryParam("topic",topic)
    builder.appendWithQueryParam("page",to)
    history.push(builder.get())
}

    useEffect(()=>{
        (async()=>{
            dispatch(FetchQuestionsStarted())
            try{
                let res = await SearchQuestionsFromApi(
                    {anywhere: anywhere, title: title, content: content, topic:topic, page: page, username: null, myQuestions: false, onlyHidden: false})
                console.log(res);
                dispatch(FetchQuestionsSuccess(res))
            }
            catch(exc){
                console.log(exc)
                dispatch(FetchQuestionsFailure(CatchIntoErrorModel(exc)))
            }
        })();
    },[anywhere, title, content, topic, page, dispatch])

    const deleteQuestion = (q: Question)=>{
        DeleteQuestion(q);
        dispatch(DeleteQuestionAction(q));
    }

    async function onLoadMore(pg: number){
        let res = await SearchQuestionsFromApi(
            {anywhere: anywhere, title: title, content: content, topic:topic, page: pg, username: null, myQuestions: false, onlyHidden: false}
            );
            dispatch(FetchMoreQuestions(res))
    }

    return {result, error, loading, username, deleteQuestion, onPageChanged,
        search:{
            anywhere, title, content, topic,
            isSearch : !!anywhere || !!content || !!title || !!topic,
            onSearch,
            count: result?.count, pageCount: result?.pageCount
        },
        onLoadMore
    };

}



export const useQuestionAnswerHook = (questionId: number) => {
    const dispatch = useDispatch();
    const question = useSelector((state: RootState) => state.question.questionwithanswers,shallowEqual);
    const error = useSelector((state: RootState) => state.question.error);
    const loading = useSelector((state: RootState) => state.question.loading);

    useEffect(()=>{
        (async()=>{
            dispatch(FetchQAStarted());
            LoadQuestionAnswerFromApi(questionId)
            .then(resp => dispatch(FetchQASuccess(resp)))
            .catch(ex => dispatch(FetchQAFailure(CatchIntoErrorModel(ex))));
            try{
                await QuestionService.subscribe(questionId);
                QuestionService.setOnNewAnswer((answer)=> dispatch(AddAnswerAction(answer)));
                QuestionService.setOnAnswerEdited((answer)=> dispatch(UpdateAnswerAction(answer)));
                QuestionService.setOnAnswerDeleted((answer)=> dispatch(DeleteAnswerAction(answer)));
                QuestionService.setOnQuestionEdited((q) => dispatch(UpdateQuestionAction(q)));
                QuestionService.setOnQuestionClosed((answer) => dispatch(CloseQuestionAction(answer)));
                QuestionService.setOnQuestionReopened(answer => dispatch(ReopenQuestionAction(answer)));
            }
            catch(ex){
                console.log(ex);
            }
        })();

        return ()=>{
            QuestionService.unsubscribe(questionId);
        }
    },[dispatch,questionId]);
    return {question,loading, error};

}

export const useNewQuestionHook = () => {
    const dispatch = useDispatch();
    const loggedIn = useSelector((state: RootState) => state.login.loggedIn);
    const username = useSelector((state : RootState) => state.login.username);
    const topics = useSelector((state: RootState) => state.topic.topics)
    const [postError, setPostError] = useState<ErrorModel |undefined>(undefined);
    const [postLoading, setPostLoading] = useState(false);
    const history = useHistory();

    useEffect(() =>{
        dispatch(LoadTopicsThunk());
    },[dispatch])

    const post = async (title: string, content: string, topic: Topic) => {
        const q : Question = {
            title: title,
            content: content,
            topic: topic,
            author: username?username:'',
            id:0,
            closed:false,
        }
        try{
            const result = await CreateQuestionToApi(q);
            setPostLoading(true);
            history.push("/questions/"+result.id);
        }
        catch(exc){
            setPostError(CatchIntoErrorModel(exc));
        }
    }

    return {topics,  loggedIn, post, postLoading, postError};
}

export const useQuestionEditHook = (question: Question) =>{
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.login.username);
    const role = useSelector((state: RootState) => state.login.role);
    const [edit, setEdit] = useState(false);
    const [closeDialogOpen, setCloseDialogOpen] = useState(false);
    const [hideDialogOpen, setHideDialogOpen] = useState(false);
    const modifyEnabled = question.author === user;
    const modified = question.created !== question.lastUpdate;

    const saveChanges =  async(request: QuestionUpdateRequest) =>{
        try{
            dispatch(OperationStartedAction("Updating question"))
            let result = await UpdateQuestion(question.id, request);
            dispatch(OperationSuccessAction())
            dispatch(UpdateQuestionAction(result));
        }
        catch(exc){
            dispatch(OperationFailedAction(CatchIntoErrorModel(exc)))
        }
        setEdit(false)
    }
    const dropChanges = () =>{
        setEdit(false)
    }
    const editQuestion = () =>{
        setEdit(true)
    }

    const handleCloseDialog = async (content: string) =>{
        try{
            if(user){
                setCloseDialogOpen(false);
                dispatch(OperationStartedAction(""))
                if(question.closed)
                    await ReopenQuestion(question.id, {id:0, content:content, author: user})
                else
                    await CloseQuestion(question.id, {id:0, content:content, author: user})
                dispatch(OperationSuccessAction())
                dispatch(LoadQuestionAnswersThunk(question.id))
            }
        }
        catch(ex){
            dispatch(OperationFailedAction(CatchIntoErrorModel(ex)));
        }
    }



    const handleHideDialog = async (message: string)=>{
        try{
            if(user){
                setHideDialogOpen(false);
                dispatch(OperationStartedAction(""))
                if(question.type === QuestionType.Simple){
                    dispatch(UpdateQuestionAction(await HideQuestion(question.id, message)));
                }
                else{
                    dispatch(UpdateQuestionAction(await UnhideQuestion(question.id)));
                }
                dispatch(OperationSuccessAction());
            }
        }
        catch(ex){
            dispatch(OperationFailedAction(CatchIntoErrorModel(ex)))
        }
    }

    return { modifyEnabled, edit, saveChanges, dropChanges, editQuestion, modified,
        close:{
            enabled: user === question.author || role ==="Admin" || role ==="Moderator",
            isClosed : question.closed,
            dialogOpen: closeDialogOpen, 
            openDialog:()=>setCloseDialogOpen(true), closeDialog: ()=>setCloseDialogOpen(false),
            handleDialog: handleCloseDialog
        },
        hide:{
            enabled: role ==="Admin" || role ==="Moderator",
            dialogOpen: hideDialogOpen,
            isHidden: question.type === QuestionType.Hidden,
            openDialog:()=>setHideDialogOpen(true), closeDialog: ()=>setHideDialogOpen(false),
            handleDialog: handleHideDialog
        }
    };
}

export const useMyQuestionsHook = () =>{
    const dispatch = useDispatch();
    const username = useSelector((state: RootState) => state.login.username)
    var result = useSelector((state : RootState) => state.question.result, shallowEqual);
    var error = useSelector((state: RootState) => state.question.error);
    var loading = useSelector((state: RootState) => state.question.loading);
    const history = useHistory();
    const queryParams = new URLSearchParams(history.location.search);
    const anywhere = queryParams.get("anywhere"), title = queryParams.get("title"), content = queryParams.get("content"), topicstr = queryParams.get("topic"),
    topic = topicstr?parseInt(topicstr):null, page = parseInt(queryParams.get("page") || "1")
    
    function onSearch(anywhere: string | null, content:string | null,
         title:string| null, topic:number| null){
        let builder = new UrlBuilder("/my_questions");
        builder.appendWithQueryParam("anywhere", anywhere)
        builder.appendWithQueryParam("content",content)
        builder.appendWithQueryParam("title",title)
        builder.appendWithQueryParam("topic",topic)
        history.push(builder.get())
    }

    function onPageChanged(from: number, to: number){
        let builder = new UrlBuilder("/my_questions")
        builder.appendWithQueryParam("anywhere",anywhere)
        builder.appendWithQueryParam("title",title)
        builder.appendWithQueryParam("content",content)
        builder.appendWithQueryParam("topic",topic)
        builder.appendWithQueryParam("page",to)
        history.push(builder.get())
    }

    async function onLoadMore(pg: number){
        let res = await SearchQuestionsFromApi(
            {anywhere: anywhere, title: title, content: content, topic:topic, page: pg, username: null, myQuestions: true, onlyHidden: false}
            );
            dispatch(FetchMoreQuestions(res))
    }
    
    useEffect(function(){
        (async function(){
            dispatch(FetchQuestionsStarted())
            try{
                let res = await SearchQuestionsFromApi(
                    {anywhere: anywhere, title: title, content: content, topic:topic, page: page, username: null, myQuestions: true, onlyHidden: false}
                    );
                console.log(res);
                dispatch(FetchQuestionsSuccess(res))
            }
            catch(exc){
                console.log(exc)
                dispatch(FetchQuestionsFailure(CatchIntoErrorModel(exc)))
            }
        })();
    },[anywhere, content, dispatch, page, title, topic]);

    const deleteQuestion = async (q: Question)=>{
        try{
            dispatch(OperationStartedAction("Deleting question..."));
            await DeleteQuestion(q);
            dispatch(OperationSuccessAction())
            dispatch(DeleteQuestionAction(q));
        }
        catch(exc){
            dispatch(OperationFailedAction(CatchIntoErrorModel(exc)))
        }

    }

    return {
        result, error, loading, username, onPageChanged, deleteQuestion, onLoadMore,
        search:{
            anywhere, title, content, topic,
            isSearch : !!anywhere || !!content || !!title || !!topic,
            onSearch,
            count: result?.count, pageCount: result?.pageCount
        }
    }
}