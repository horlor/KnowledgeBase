import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { Container } from "@material-ui/core";
import { useSearchQuestionsHook } from "../../hooks/QuestionHooks";
import QuestionCard from "../question/QuestionCard";
import ErrorView from "../common/ErrorView";
import SearchPanel from "../question/SearchPanel";

type IProps = RouteComponentProps<{

}>;

const SearchQuestionsPage: React.FC<IProps> = props => {
	const queryParams = new URLSearchParams(props.location.search);
	const anywhere = queryParams.get("anywhere"), title = queryParams.get("title"), content = queryParams.get("content")
	const topicstr = queryParams.get("topic")
	const topic = topicstr? parseInt(topicstr): null; 
	const {result, error} = useSearchQuestionsHook(anywhere,title,content,topic)
	if(error)
		return <ErrorView title={error.code} message={error.description}/>;
	return(
		<Container maxWidth="xl">
			<SearchPanel count={result?result.count:0} anywhere={anywhere} content={content} title={title} topicId={topic}/>
			{result?.questions.map(q => <QuestionCard key={q.id} question={q}/>)}
		</Container>
	);
}

export default SearchQuestionsPage;
