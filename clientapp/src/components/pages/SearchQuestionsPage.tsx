import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Container, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@material-ui/core";
import { useSearchQuestionsHook } from "../../hooks/QuestionHooks";
import QuestionCard from "../question/QuestionCard";
import ErrorView from "../common/ErrorView";
import SearchPanel from "../question/SearchPanel";
import Pagination from "../common/Pagination";
import { UrlBuilder } from "../../helpers/UrlBuilder";
import LoadingView from "../common/LoadingView";
import Question from "../../models/Question";

type IProps = RouteComponentProps<{

}>;

const SearchQuestionsPage: React.FC<IProps> = props => {
	const {result, error, deleteQuestion, username, search, onPageChanged} = useSearchQuestionsHook()
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
				<SearchPanel count={result.count} pages={result?result.pageCount:0}
				 anywhere={search.anywhere} content={search.content} title={search.title} topicId={search.topic}
				  onSearch={search.onSearch} isSearch={search.isSearch}/>
				{result?.questions.map(q => <QuestionCard key={q.id} question={q} delete={
            (username === q.author)?
               ()=>{ DeleteQuestionWithDialog(q)}:
                undefined
        }/>)}
				<Pagination pageChanged={onPageChanged} pageNum={result?result.pageCount:0} current={result?result.page:0}/>
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

export default SearchQuestionsPage;
