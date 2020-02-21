import React from 'react';
import Question from './Question';
import QuestionView from './QuestionView';
import {Container} from '@material-ui/core';
import axios, { AxiosError } from 'axios';

interface IProps{

}
interface IState{
    questions : Question[];
    loading : boolean;
    error: string
}

class QuestionsPage extends React.Component<IProps,IState>{
    constructor(props: IProps){
        super(props);
        this.state = {questions : [], loading:false, error: ""}
    }

    public componentDidMount(){
        this.setState({loading:true});
        axios.get<Question[]>("/api/questions")
            .then(resp => this.setState({loading:false,questions:resp.data}))
            .catch(reason => {
                const Aerror = reason as AxiosError;
                if (Aerror != null)
                    this.setState({error: Aerror.message, loading:false});
                else
                    this.setState({error:"Unidentified error happened, please try again later.", loading:false});
                console.log(this.state.error);
            });
    }

    public render(){
        return(
            <Container>
            {this.state.loading?
                <p>Loading</p>:
                this.state.error !== "" ? <p>{this.state.error}</p>:

                this.state.questions.map(q => <QuestionView title={q.title} content={q.content} author={q.author}/>)
            }
            </Container>
        );
    }


}

export default QuestionsPage;