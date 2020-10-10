import React, { useState } from "react";
import { Container, Box, Paper, makeStyles, List, ListItem, ListItemText, TextField, Button } from "@material-ui/core";
import { useTopicHook } from "../../hooks/TopicHooks";
import ErrorPage from "../common/ErrorPage";
import LoadingView from "../common/LoadingView";
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import ClearIcon from '@material-ui/icons/Clear';
import SaveIcon from '@material-ui/icons/Save';

import { useForm } from "react-hook-form";
import { Autocomplete } from "@material-ui/lab";
import { Topic, TopicDetailed } from "../../models/Topic";

const useStyles = makeStyles(theme =>({
    paper:{
        display:"flex",
        flexDirection:"row",
        height:"100%"
    },
    masterPanel:{
        width:"200px",
        height:"100%",
        borderRight:"2px solid lightgray",
        overflow:"auto"
    },
    detailPanel:{
        flexGrow:1,
        height:"100%",
        padding:theme.spacing(1)
    },
    root:{
        height:`calc(100% - 16px)`,
        margin:theme.spacing(1),
    },
    topicSelect:{
        width:"240px",
        display:"block"
    },
    commandBar:{
        padding:theme.spacing(1)
    },
    commandButton:{
        margin:theme.spacing(1)
    },
    inputField:{
        margin:theme.spacing(1),
        width:"300px"
    }

}))

interface IProps{

}

interface IFormData{
    name:string
}

const TopicPage : React.FC<IProps> = (props: IProps) =>{
    const {topics, error, selectTopic, selected, saveChanges, newTopic, createNew} = useTopicHook();
    const {register, handleSubmit} = useForm<IFormData>();
    const classes = useStyles();
    const [ancestor, setAncestor] = useState<Topic | null | undefined>(undefined);

    const onSubmit = (data: IFormData) =>{
        if(selected){
            let t :TopicDetailed = {
                id: selected.id,
                name: data.name,
                ancestor: null
            }
            if(ancestor ===undefined)
                t.ancestor = selected.ancestor;
            else
                t.ancestor = ancestor;
            saveChanges(t);
        }
        if(newTopic){
            let t: TopicDetailed = {
                id:0,
                name: data.name,
                ancestor: ancestor?ancestor:null,
            }
            saveChanges(t);
        }

    }

    if(error)
        return <ErrorPage title={error.title} message={error.description}/>;
    if(!topics)
        return <LoadingView/>
    return (
        <Container className={classes.root} maxWidth="lg">
            <Paper className={classes.paper}>
                <Box className={classes.masterPanel}>
                    <List>
                        {
                            topics?.map(t => (
                            <ListItem key={t.id} button onClick={()=>selectTopic(t)}>
                                <ListItemText primary={t.name} />
                            </ListItem>
                            ))
                        }
                    </List>
                </Box>
                <Box className={classes.detailPanel}>
                    <Box className={classes.commandBar} display="flex" flexDirection="row">
                        <Button 
                            className={classes.commandButton} 
                            startIcon={<AddIcon/>} variant="outlined"
                            onClick={createNew}
                            >
                            Create
                        </Button>
                        {/*<Button 
                            className={classes.commandButton}
                            startIcon={<DeleteIcon/>} variant="outlined"
                            >
                            Delete
                        </Button>*/}
                    </Box>
                    {(selected || newTopic)?
                        <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            className={classes.inputField}
                            defaultValue={selected?.name}
                            label="Name"
                            name="name"
                            inputRef={register}
                        />
                        <Autocomplete
                            className={classes.inputField}
                            id="ancestor-combobox"
                            options={topics}
                            getOptionLabel={(topic) => topic?topic.name:""}
                            defaultValue={selected?.ancestor}
                            onChange={((e: any,v: any)=>{setAncestor(v)})}
                            renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
                            />
                        <Button type="submit">
                            Save
                        </Button>
                        </form>
                    :""}   
                </Box>
            </Paper>
        </Container>

    );
}

export default TopicPage;