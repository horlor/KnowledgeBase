import React from 'react';
import { TextField, Card, Typography, Box, Button } from '@material-ui/core';

interface IProps{

}

interface IState{

}

class AnswerInput extends React.Component<IProps, IState>{
    public render(){
        return (
            <Card style={{margin: "5px", padding: "5px"}}>
                <Typography variant="h6">Your Answer</Typography>
                <TextField multiline variant="outlined" rows={5} style={{width:"100%", padding:"10px"}}>
                </TextField>
                <Box display="flex">
                    <Button size='medium' align-flex="center">Post</Button>
                    <Box flexGrow={1}/>
                    <Typography align-flex="center">200/200</Typography>
                </Box>
            </Card>
        );
    }
}

export default AnswerInput;