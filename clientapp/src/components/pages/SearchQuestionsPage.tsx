import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { Container } from "@material-ui/core";
import { useSearchQuestionsHook } from "../../hooks/QuestionHooks";
import QuestionCard from "../question/QuestionCard";
import ErrorView from "../common/ErrorView";
import SearchPanel from "../question/SearchPanel";
import Pagination from "../common/Pagination";
import { UrlBuilder } from "../../helpers/UrlBuilder";

type IProps = RouteComponentProps<{

}>;

const SearchQuestionsPage: React.FC<IProps> = props => {
	const queryParams = new URLSearchParams(props.location.search);
	const anywhere = queryParams.get("anywhere"), title = queryParams.get("title"), content = queryParams.get("content"),
	topicstr = queryParams.get("topic"), pagestr = queryParams.get("page");
	const topic = topicstr? parseInt(topicstr): null; 
	const page = parseInt(pagestr || "1")
	const {result, error} = useSearchQuestionsHook(anywhere,title,content,topic, page)
	if(error)
		return <ErrorView title={error.code} message={error.description}/>;
	return(
		<Container maxWidth="xl">
			<SearchPanel count={result?result.count:0} pages={result?result.pageCount:0} anywhere={anywhere} content={content} title={title} topicId={topic}/>
			{result?.questions.map(q => <QuestionCard key={q.id} question={q}/>)}
		<Pagination pageChanged={(from, to)=>{
			let url = new UrlBuilder("/search_questions")
			url.appendWithQueryParam("anywhere",anywhere)
			url.appendWithQueryParam("title",title)
			url.appendWithQueryParam("content",content)
			url.appendWithQueryParam("topic",topic)
			url.appendWithQueryParam("page",to)
            props.history.push(url.get());
        }} pageNum={result?result.pageCount:0} current={result?result.page:0}/>
		</Container>
	);
}

export default SearchQuestionsPage;
