import axios from 'axios';
import Question from '../models/Question';

export const LoadAnswers = async (): Promise<Question[]>=>{
    var response = await axios.get<Question[]>("/questions");
    return [];
}
/*
//The axios logic to add to the LoadAnswers function
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
}*/