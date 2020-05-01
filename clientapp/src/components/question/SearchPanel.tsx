import React, { useState } from 'react';
import { Paper, TextField, Button, makeStyles, Box, Divider, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search'
import { useHistory } from 'react-router';
import { UrlBuilder } from '../../helpers/UrlBuilder';
import { useTopicState } from '../../hooks/TopicHooks';
import { Autocomplete } from '@material-ui/lab';

interface IProps{
    count: number,
    anywhere: string | null,
    title: string| null,
    content: string| null,
    topicId: number |null,
}

const useStyles = makeStyles(theme=>({
    paper: {
        minWidth:"200px",
        padding:theme.spacing(1),
        margin:theme.spacing(1)
    },
    textfield:{
        width:"100%",
        padding: theme.spacing(1)
    },
    panel:{
        alignItems:"end",
        margin:theme.spacing(1)
    }
    
}))

const SearchPanel: React.FC<IProps> = (props) =>{
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState(props.title)
    const [anywhere, setAnywhere] = useState(props.anywhere)
    const [content, setContent] = useState(props.content)
    const [topic, setTopic] = useState(props.topicId)
    const topics = useTopicState()
    const history = useHistory();
    const classes = useStyles();

    const onSearch = ()=>{
        setOpen(false)
        let builder = new UrlBuilder("/search_questions");
        builder.appendWithQueryParam("anywhere", anywhere)
        builder.appendWithQueryParam("content",content)
        builder.appendWithQueryParam("title",title)
        builder.appendWithQueryParam("topic",topic)
        history.push(builder.get())
    }

    if(open)
        return(
            <Paper className={classes.paper}>
                <form>
                <Box display="flex" flexDirection="row">
                    <TextField
                        className={classes.textfield}
                        label="Title"
                        variant="outlined"
                        onBlur={(e)=>setTitle(e.target.value)}
                        defaultValue={props.title}
                    />
                    <Button endIcon={<SearchIcon/>} onClick={onSearch}>Search</Button>
                </Box>
                <TextField
                    className={classes.textfield}
                    label="Anywhere"
                    variant="outlined"
                    onBlur={(e)=>setAnywhere(e.target.value)}
                    defaultValue={props.anywhere}
                />
                <TextField
                        className={classes.textfield}
                        label="Content"
                        variant="outlined"
                        onBlur={(e)=>setContent(e.target.value)}
                        defaultValue={props.content}
                        multiline
                        rows={3}
                />
                <Autocomplete
                    className={classes.textfield}
                    id="ancestor-combobox"
                    options={topics}
                    getOptionLabel={(topic) => topic?topic.name:""}
                    defaultValue={topics.find(t => t.id === props.topicId)}
                    onChange={((e: any,v: any)=>{setTopic(v.id)})}
                    renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
                    />
                </form>
            </Paper>
        );
    else
            return(
                <Box display="flex" className={classes.panel}>
                    <Typography align="center">{`${props.count} question found`}</Typography>
                    <Box flexGrow={1}/>
                    <Button 
                        onClick={()=>setOpen(true)}
                        variant="outlined">Edit search</Button>
                </Box>
            );
}

export default SearchPanel;