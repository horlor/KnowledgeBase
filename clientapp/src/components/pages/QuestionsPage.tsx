import React from 'react';
import QuestionCard from '../question/QuestionCard';
import {Container} from '@material-ui/core';
import {  useQuestionsHook } from '../../hooks/QuestionHooks';
import LoadingView from '../common/LoadingView';
import ErrorView from '../common/ErrorView';
import Pagination from '../common/Pagination';
import { RouteComponentProps } from 'react-router-dom';
import { useLoginState } from '../../hooks/LoginHooks';
import { DeleteQuestion } from '../../api/QuestionApi';

type IProps = RouteComponentProps<{

}>;

const QuestionsPage : React.FC<IProps> = (props) => {
    const queryParams = new URLSearchParams(props.location.search);
    const page = parseInt(queryParams.get("page") || "1");
    const {questions, error, loading, currentPage, pageCount} = useQuestionsHook(page);
    const {username} = useLoginState();
    if(loading)
        return <LoadingView/>;
    if(error)
        return <ErrorView title={error.code} message={error.description}/>;
    return(
        <Container maxWidth="xl">
        {
        questions.map(q => <QuestionCard question={q}  key={q.id} delete={
            (username === q.author)?
               ()=>{ DeleteQuestion(q)}:
                undefined
        }/>)
        }
        <Pagination pageChanged={(from, to)=>{
            props.history.push(`/questions?page=${to}`);
        }} pageNum={pageCount} current={currentPage}/>
        </Container>
    );
}


export default QuestionsPage;