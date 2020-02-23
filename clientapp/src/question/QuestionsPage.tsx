import React from 'react';
import Question from './Question';
import QuestionCard from './QuestionCard';
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

                this.state.questions.map(q => <QuestionCard question={q}  key={q.id}/>)
            }
            </Container>
        );
    }


}

export default QuestionsPage;