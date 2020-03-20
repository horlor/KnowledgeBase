import React, { useState } from 'react';
import { Container, Grid, TextField, Paper, makeStyles, Divider, Box, Typography, Chip, IconButton, Button } from '@material-ui/core';
import {Autocomplete} from '@material-ui/lab'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { useForm } from 'react-hook-form';
import { useProfileHook } from '../../hooks/UserHooks';
import { Topic } from '../../models/Topic';
import { UserDetailed } from '../../models/User';

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
    console.log(user)
    const {register, handleSubmit, setValue} = useForm<IFormData>({defaultValues:{
        firstname: user.firstName,
        lastname: user.lastName,
        email: user.email,
        introduction: user.introduction,
    }});
    const [topics, setTopics] = useState<Topic[]>([]);
    

    const handleChipDelete = () =>{

    }

    const onSubmit = (data: IFormData) =>{
        
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
                            ref={register}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} className={classes.item}>
                        <TextField className={classes.textfield}
                            label="Last name"
                            name="lastname"
                            ref={register}
                        />
                    </Grid>
                </Grid>
                <Box className={classes.item}>
                    <TextField className={classes.textfield}
                            label="Email"
                            name="email"
                            ref={register}
                    />
                </Box>

                <Divider className={classes.divider}/>
                    <TextField className={classes.textfield}
                        label="Introduction"
                        name="introduction"
                        multiline
                        variant="outlined"
                        rows={8}
                        ref={register}
                    />
                <Divider className={classes.divider}/>
                <Typography>Followed Topics</Typography>
                <Box display="flex" flexDirection="row">
                    <Autocomplete
                        options={props.availableTopics}
                        getOptionLabel={topic => topic.name}
                        className={classes.chipinput}
                        renderInput={params => <TextField {...params} variant="outlined" />}
                    />
                    <IconButton>
                        <AddCircleOutlineIcon/>
                    </IconButton>
                </Box>

                <Paper className={classes.chiparray} variant="outlined">
                    <Chip label="test" onDelete={handleChipDelete}/>
                    <Chip label="testetetet" onDelete={handleChipDelete}/>
                </Paper>
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