import React from "react";
import { Container, CircularProgress } from "@material-ui/core";
import { useSearchQuestionsHook } from "../../hooks/QuestionHooks";
import QuestionCard from "../question/QuestionCard";
import ErrorPage from "../common/ErrorPage";
import SearchPanel from "../question/SearchPanel";
import LoadingView from "../common/LoadingView";
import InfiniteScroll from 'react-infinite-scroller';

interface IProps{

};

const SearchQuestionsPage: React.FC<IProps> = props => {
	const {result, error, search, onPageChanged, onLoadMore} = useSearchQuestionsHook()
	
	if(error)
		return <ErrorPage error={error}/>;
	if(!result)
		return <LoadingView/>
	return(
		<>
			<Container maxWidth="xl">
				<SearchPanel count={result.count} pages={result?result.pageCount:0}
				 anywhere={search.anywhere} content={search.content} title={search.title} topicId={search.topic}
				  onSearch={search.onSearch} isSearch={search.isSearch}/>
				<InfiniteScroll
					hasMore={result.page<result.pageCount}
					loadMore={onLoadMore}
					loader={<CircularProgress/>}
					initialLoad={false}
					pageStart={1}
					
				>
					{result?.questions.map(q => <QuestionCard key={q.id} question={q} delete={undefined}/>)}
				</InfiniteScroll>
			</Container>
		</>
	);
}

export default SearchQuestionsPage;
