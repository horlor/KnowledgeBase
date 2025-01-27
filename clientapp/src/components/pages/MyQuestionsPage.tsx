import React, { useState } from 'react'
import { useMyQuestionsHook } from '../../hooks/QuestionHooks';
import Question from '../../models/Question';
import SearchPanel from '../question/SearchPanel';
import { Container, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, CircularProgress } from "@material-ui/core";
import QuestionCard from '../question/QuestionCard';
import ErrorPage from '../common/ErrorPage';
import LoadingView from '../common/LoadingView';
import InfiniteScroll from 'react-infinite-scroller';

const MyQuestionsPage : React.FC = () =>{
	const {result, error, username, search, deleteQuestion, onPageChanged, onLoadMore} = useMyQuestionsHook()
	const [selected, setSelected] = useState<Question>();

    const DeleteQuestionWithDialog = (q: Question)=>{
        setSelected(q);
	}
	
	if(error)
		return <ErrorPage error={error}/>;
	if(!result)
		return <LoadingView/>
	return(
		<>
			<Container maxWidth="xl">
				<SearchPanel
					count={result.count} pages={result.pageCount}
					anywhere={search.anywhere} content={search.content}
					title={search.title} topicId={search.topic}
					isSearch={search.isSearch}
					onSearch={search.onSearch}/>

				<InfiniteScroll
					hasMore={result.page<result.pageCount}
					loadMore={onLoadMore}
					loader={<CircularProgress/>}
					initialLoad={false}
					pageStart={1}
				>
					{result?.questions.map(q => <QuestionCard key={q.id} question={q} delete={
					(username === q.author)?
						()=>{ DeleteQuestionWithDialog(q)}:
						undefined
				}/>)}
				</InfiniteScroll>
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

export default MyQuestionsPage;