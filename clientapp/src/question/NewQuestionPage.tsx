import React from 'react';
import {TextField,  Typography, FormControl, InputLabel, Input, FormHelperText, Container, makeStyles, createStyles, Card, Button, CardActionArea } from '@material-ui/core';

const useStyles = makeStyles(theme => createStyles({
    container:{
        width:"100%"
    },
    formcontrol:{
        width:"100%",
    },
    card:{
        marginTop:"10px",
        width:"100%",
        padding: "10px",
    },
    input:{
        width:"100%",
    }
}));


interface IProps{

}

const NewQuestionPage : React.FC<IProps> = (props) => {
    const classes = useStyles();

    const post = ()=>{

    }

    return(
        <Container maxWidth="lg" className={classes.container}>
            <Card variant="outlined" className={classes.card}>
                <Typography variant="h5">Ask your question here</Typography>
                <FormControl className={classes.formcontrol}>
                    <InputLabel htmlFor="title_input">Title:</InputLabel>
                    <Input id="title_input" aria-describedby="title-helper" className={classes.input}/>
                    <FormHelperText id="title-helper">A short introduction to your question</FormHelperText>
                </FormControl>
                <FormControl className={classes.formcontrol}>
                    <label htmlFor="content_input">Content:</label>
                    <TextField
                        multiline rows={10} variant="outlined"
                        id="content_input" aria-describedby="content-helper"
                        className={classes.input}/>
                    <FormHelperText id="content-helper">Write all related information here</FormHelperText>
                </FormControl>
                <CardActionArea action={post} >
                    <Typography variant="button">
                        Post
                    </Typography>
                </CardActionArea>
            </Card>
        </Container>
    );
}

export default NewQuestionPage;