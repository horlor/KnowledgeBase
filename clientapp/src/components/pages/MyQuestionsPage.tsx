import React, { useState } from 'react'
import { UrlBuilder } from '../../helpers/UrlBuilder';
import { useMyQuestionsHook } from '../../hooks/QuestionHooks';
import Question from '../../models/Question';
import Pagination from '../common/Pagination';
import SearchPanel from '../question/SearchPanel';
import { Container, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@material-ui/core";
import QuestionCard from '../question/QuestionCard';
import ErrorView from '../common/ErrorView';
import LoadingView from '../common/LoadingView';

const MyQuestionsPage : React.FC = () =>{
	const {result, error, username} = useMyQuestionsHook()
	const [selected, setSelected] = useState<Question>();

    const DeleteQuestionWithDialog = (q: Question)=>{
        setSelected(q);
	}
	
	if(error)
		return <ErrorView title={error.code} message={error.description}/>;
	if(!result)
		return <LoadingView/>
	return(
		<>
			<Container maxWidth="xl">
				{result?.questions.map(q => <QuestionCard key={q.id} question={q} delete={
            (username === q.author)?
               ()=>{ DeleteQuestionWithDialog(q)}:
                undefined
        }/>)}
			</Container>
		</>
	);
}

export default MyQuestionsPage;