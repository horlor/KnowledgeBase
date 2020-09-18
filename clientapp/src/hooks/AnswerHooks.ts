import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../redux/Store'
import Answer, { AnswerUpdateRequest, AnswerType } from '../models/Answer';
import { CreateAnswerToQuestion, DeleteAnswer, HideAnswer, UnhideAnswer, UpdateAnswer } from '../api/QuestionApi';
import { AddAnswerAction, DeleteAnswerAction, UpdateAnswerAction } from '../redux/reducers/QuestionReducer';
import { UserReducer } from '../redux/reducers/UserReducer';

export const useAnswerInputHook = (id: number)=>{
    const loggedIn = useSelector((state: RootState) => state.login.loggedIn);
    const user = useSelector((state: RootState) => state.login.username);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const postAnswer = async (content: string) => {
        if(user === undefined)
            return;
        setLoading(true);
        let answer : Answer = {id:0, author: user, content:content};
        CreateAnswerToQuestion(id, answer)
        .then(resp => {
            setLoading(false);
        })
        .catch(exc=> setLoading(false));
    }

    return {loggedIn, user, error, loading, postAnswer}
}

export const useAnswerHook = (answer: Answer) =>{
    const loggedIn = useSelector((state: RootState) => state.login.loggedIn);
    const user = useSelector((state: RootState) => state.login.username);
    const role = useSelector((state: RootState) => state.login.role);
    const question = useSelector((state:RootState) => state.question.questionwithanswers)
    const dispatch = useDispatch();
    const [edit, setEdit] = useState(false);
    const [deleteDialog, setDelete] = useState(false);
    const modifyEnabled = answer.author === user && answer.type == AnswerType.Simple;
    const modified = answer.created !== answer.lastUpdate;
    const [hideDialogOpen, setHideDialogOpen] = useState(false);


    const saveChanges =  async(request: AnswerUpdateRequest) =>{
        try{
             let response = await UpdateAnswer(question?.id || 0,answer.id,request);
            const ans = response;
            dispatch(UpdateAnswerAction(ans));
        }
        catch(exc){
            console.log(exc);
        }
        setEdit(false)
    }
    const dropChanges = () =>{
        setEdit(false)
    }
    const editAnswer = () =>{
        setEdit(true)
    }

    const deleteWithDialog = ()=>{
        setDelete(true)
    }

    const acceptDelete = async() =>{
        try{
            await DeleteAnswer(question?.id || 0,answer);
            dispatch(DeleteAnswerAction(answer))
        }
        catch(exc){
            console.log(exc);
        }

        setDelete(false);
    }

    const dropDelete = () =>{
        setDelete(false);
    }

    const handleHideDialog = async(message: string)=>{
        if(user){
            if(answer.type === AnswerType.Simple)
                dispatch(UpdateAnswerAction(await HideAnswer(question?.id || 0, answer.id, message)))
            else
                dispatch(UpdateAnswerAction(await UnhideAnswer(question?.id || 0, answer.id)))
        }
        setHideDialogOpen(false);
    }



    return {edit, saveChanges, dropChanges, editAnswer, deleteWithDialog, acceptDelete, dropDelete, deleteDialog, modifyEnabled, modified,
        hide:{
            enabled: answer.type !== AnswerType.Closer && answer.type !== AnswerType.Reopener && (role ==="Admin" || role ==="Moderator") ,
            isHidden: answer.type === AnswerType.HiddenByModerator,
            cardShown : answer.type === AnswerType.HiddenByModerator && (role ==="Admin" || role ==="Moderator" || answer.author === user && !!user),
            dialogOpen: hideDialogOpen,
            openDialog: ()=> setHideDialogOpen(true), closeDialog: ()=> setHideDialogOpen(false),
            handleDialog: handleHideDialog
        }
    };
}