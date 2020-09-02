import React, { useState, useEffect } from 'react';
import { Container, Grid, TextField, Paper, makeStyles, Divider, Box, Typography, Chip, IconButton, Button, Dialog, CircularProgress, Snackbar, Backdrop, DialogTitle, DialogActions, DialogContentText, DialogContent, Input, Avatar, InputLabel } from '@material-ui/core';
import {Autocomplete, Alert} from '@material-ui/lab'
import { useForm } from 'react-hook-form';
import { Topic } from '../../models/Topic';
import { UserDetailed, UserUpdateRequest } from '../../models/User';
import ErrorModel from '../../models/ErrorModel';
import { GetAvatarPathForUser } from '../../api/UserApi';

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
    },
    avatar:{
        height:theme.spacing(10),
        width: theme.spacing(10),
        marginRight: theme.spacing(0,0,1,0),
    },
    button:{
        margin:theme.spacing(1)
    }
}));

interface IProps{
    availableTopics: Topic[],
    user: UserDetailed,
    onSubmit: (request: UserUpdateRequest, avatar?: FileList) =>void,
    onDrop?: () => void,
    deleteAvatar: ()=> void,
    saveLoading: boolean,
    saveError?: ErrorModel,
    onErrorClose?: ()=>void,
}


interface IFormData{
    firstname: string,
    lastname: string,
    email: string,
    introduction: string,
    avatar: FileList,
}

const EditProfileView : React.FC<IProps> = (props) =>{
    const classes = useStyles();
    const user = props.user;
    const {register, handleSubmit, errors, watch} = useForm<IFormData>({mode:"onBlur"});
    //Getting topics from user - it must be the same reference to AutoComplete work correct
    const [selectedTopics, setSelectedTopics] = useState<Topic[]>([]);
    const [topicsLoaded, setTopicsLoaded] = useState(false);
    const [imageSrc, setImageSrc] = useState(GetAvatarPathForUser(props.user));
    const [avatarDialog, setAvatarDialog] = useState(false);
    let deftopics : Topic[] = [];
    if(!topicsLoaded){
        user.topics.forEach(t => {
            let topic = props.availableTopics.find(tp => tp.id == t.id);
            if(topic)
                deftopics.push(topic);
        });
        setSelectedTopics(deftopics)
        setTopicsLoaded(true);
    }
    const avatarPath = watch("avatar");
    const handleImage = ()=>{
        let reader = new FileReader();
        let file = avatarPath?.item(0);
        if(file)
        {
            let url =  reader.readAsDataURL(file);
            reader.onload = ()=>{
                if(reader.result)
                    setImageSrc(reader.result+"");
            }
        }
        else{
            setImageSrc(GetAvatarPathForUser(props.user)+"#"+Date.now());
        }
    }

    const onSubmit = (data: IFormData) =>{
        props.onSubmit({
            firstName: data.firstname,
            lastName: data.lastname,
            email: data.email,
            introduction: data.introduction,
            topics: selectedTopics,
        },data.avatar);
    }

    const onDeleteAvatar = ()=>{
        props.deleteAvatar();
        setImageSrc("#")
        setAvatarDialog(false);
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
                            error={!!errors.email}
                            helperText={errors.email?"Please enter a valid email address":""}
                            inputRef={register({pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/igm , 
                        })}
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
                <Divider className={classes.divider}/>
                <Typography>Avatar</Typography>
                <Box display="flex" flexDirection="row" className={classes.item}>
                    <Avatar className={classes.avatar} src={imageSrc} >{props.user.userName.slice(0,1)}</Avatar>
                    <label htmlFor="avatar">
                        <input style={{display: "none"}} id="avatar" name="avatar" accept="image/*" type="file" ref={register}
                        onChange={handleImage}/>
                        <Button className={classes.button} component="span" variant="contained" color="primary">Upload avatar</Button>
                        <Button className={classes.button} onClick={()=>{setAvatarDialog(true)}}
                            variant="contained" color="secondary">Delete Avatar</Button>
                    <Typography>{avatarPath?.item(0)?.name}</Typography>
                    </label>
                    
                </Box>
                <Divider/>
                <Box display="flex" flexDirection="row" className={classes.saveRow}>
                    {props.saveLoading?<CircularProgress/>:
                    <Button type="submit" color="primary" variant="outlined">Save</Button>}
                    <Box flexGrow={1}></Box>
                    <Button color="secondary" variant="outlined" onClick={props.onDrop}>Don't save</Button>
                </Box>
            </form>
            </Paper>
            <Dialog open={!!props.saveError} onClose={props.onErrorClose}>
                    <DialogTitle>Error occured during the save</DialogTitle>
                    <DialogContent>
                        <DialogContentText>{props.saveError?.description}</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={props.onErrorClose}>Ok</Button>
                    </DialogActions>
            </Dialog>
            <Dialog open={avatarDialog} onClose={()=>setAvatarDialog(false)}>
                    <DialogTitle>Deleting avatar</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Are you sure to delete your avatar? This cannot be undone.</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={onDeleteAvatar}>Ok</Button>
                        <Button onClick={()=>setAvatarDialog(false)}>Cancel</Button>
                    </DialogActions>
            </Dialog>
        </Container>
    );
    }

export default EditProfileView;