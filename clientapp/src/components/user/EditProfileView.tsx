import React, { useState, useEffect } from 'react';
import { Container, Grid, TextField, Paper, makeStyles, Divider, Box, Typography, Chip, IconButton, Button } from '@material-ui/core';
import {Autocomplete} from '@material-ui/lab'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { useForm } from 'react-hook-form';
import { useProfileHook } from '../../hooks/UserHooks';
import { Topic } from '../../models/Topic';
import { UserDetailed, UserUpdateRequest } from '../../models/User';

const useStyles = makeStyles(theme =>({
    paper:{
        padding:theme.spacing(1),
        margin: theme.spacing(1),
    },
    textfield:{
        width:"100%",
    },
    item:{
        padding: theme.spacing(1),
    },
    divider:{
        margin:theme.spacing(2,0,2,0),
    },
    chiparray:{
        padding: theme.spacing(1),
    },
    chipinput:{
        flexGrow: 1,
        margin: theme.spacing(1),
    },
    saveRow:{
        margin: theme.spacing(1),
    }
}));

interface IProps{
    availableTopics: Topic[],
    user: UserDetailed,
    onSubmit: (request: UserUpdateRequest) =>void
}


interface IFormData{
    firstname: string,
    lastname: string,
    email: string,
    introduction: string,
}

const EditProfileView : React.FC<IProps> = (props) =>{
    const classes = useStyles();
    const user = props.user;
    const {register, handleSubmit, setValue} = useForm<IFormData>();
    //Getting topics from user - it must be the same reference to AutoComplete work correct
    const [selectedTopics, setSelectedTopics] = useState<Topic[]>([]);
    const [topicsLoaded, setTopicsLoaded] = useState(false);
    let deftopics : Topic[] = [];
    if(!topicsLoaded){
        user.topics.map(t => {
            let topic = props.availableTopics.find(tp => tp.id == t.id);
            if(topic)
                deftopics.push(topic);
        });
        setSelectedTopics(deftopics)
        setTopicsLoaded(true);
    }
        

    const onSubmit = (data: IFormData) =>{
        props.onSubmit({
            firstName: data.firstname,
            lastName: data.lastname,
            email: data.email,
            introduction: data.introduction,
            topics: selectedTopics,
        });
    }


    return (
        <Container maxWidth="xl">
            <Paper className={classes.paper}>
            <Typography variant="h4">My Profile</Typography>
            <Divider className={classes.divider}/>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid  container>
                    <Grid item xs={12} md={6} className={classes.item}>
                        <TextField className={classes.textfield}
                            label="First name"
                            name="firstname"
                            inputRef={register}
                            defaultValue={user.firstName}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} className={classes.item}>
                        <TextField className={classes.textfield}
                            label="Last name"
                            name="lastname"
                            inputRef={register}
                            defaultValue={user.lastName}
                        />
                    </Grid>
                </Grid>
                <Box className={classes.item}>
                    <TextField className={classes.textfield}
                            label="Email"
                            name="email"
                            inputRef={register}
                            defaultValue={user.email}
                    />
                </Box>

                <Divider className={classes.divider}/>
                    <TextField className={classes.textfield}
                        label="Introduction"
                        name="introduction"
                        multiline
                        variant="outlined"
                        rows={8}
                        defaultValue={user.introduction}
                        inputRef={register}
                    />
                <Divider className={classes.divider}/>
                <Typography>Followed Topics</Typography>
                <Box display="flex" flexDirection="row">
                    <Autocomplete
                        options={props.availableTopics}
                        defaultValue={selectedTopics}
                        getOptionLabel={topic => topic.name}
                        className={classes.chipinput}
                        multiple
                        onChange={((e,v)=> {setSelectedTopics(v)})}
                        renderInput={params => <TextField {...params} variant="outlined" 
                        name="topics"/>}
                    />
                </Box>
                <Box display="flex" flexDirection="row" className={classes.saveRow}>
                    <Button type="submit" color="primary" variant="outlined">Save</Button>
                    <Box flexGrow={1}></Box>
                    <Button color="secondary" variant="outlined">Don't save</Button>
                </Box> 
            </form>
            </Paper>

        </Container>
    );
    }

export default EditProfileView;