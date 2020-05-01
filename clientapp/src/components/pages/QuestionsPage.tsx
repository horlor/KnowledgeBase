import React, { useState } from 'react';
import QuestionCard from '../question/QuestionCard';
import {Container, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button} from '@material-ui/core';
import {  useQuestionsHook } from '../../hooks/QuestionHooks';
import LoadingView from '../common/LoadingView';
import ErrorView from '../common/ErrorView';
import Pagination from '../common/Pagination';
import { RouteComponentProps } from 'react-router-dom';
import { useLoginState } from '../../hooks/LoginHooks';
import Question from '../../models/Question';
import SearchPanel from '../question/SearchPanel';

type IProps = RouteComponentProps<{

}>;

const QuestionsPage : React.FC<IProps> = (props) => {
    const queryParams = new URLSearchParams(props.location.search);
    const page = parseInt(queryParams.get("page") || "1");
    const {questions, error, loading, currentPage, pageCount, deleteQuestion} = useQuestionsHook(page);
    const {username} = useLoginState();
    const [selected, setSelected] = useState<Question>();

    const DeleteQuestionWithDialog = (q: Question)=>{
        setSelected(q);
    }

    if(loading)
        return <LoadingView/>;
    if(error)
        return <ErrorView title={error.code} message={error.description}/>;
    return(
        <>
        <Container maxWidth="xl">
        {
        questions.map(q => <QuestionCard question={q}  key={q.id} delete={
            (username === q.author)?
               ()=>{ DeleteQuestionWithDialog(q)}:
                undefined
        }/>)
        }
        <Pagination pageChanged={(from, to)=>{
            props.history.push(`/questions?page=${to}`);
        }} pageNum={pageCount} current={currentPage}/>
        </Container>
        <Dialog open={!!selected}>
        <DialogTitle>Warning!</DialogTitle>
            <DialogContent>
                <DialogContentText>{`Are you sure to delete the following question: ${selected?.title}?`}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={()=> {
                        if(selected){
                            deleteQuestion(selected)
                            
                        }
                        setSelected(undefined)}}
                    >Ok</Button>
                <Button onClick={()=> {setSelected(undefined)}}>Cancel</Button>
            </DialogActions>
        </Dialog>
        </>
    );
}


export default QuestionsPage;