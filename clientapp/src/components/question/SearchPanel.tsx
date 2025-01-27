import React, { useState } from 'react';
import { Paper, TextField, Button, makeStyles, Box, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search'
import { useHistory } from 'react-router';
import { UrlBuilder } from '../../helpers/UrlBuilder';
import { useTopicState } from '../../hooks/TopicHooks';
import { Autocomplete } from '@material-ui/lab';

interface IProps{
    count: number,
    pages: number,
    anywhere: string | null,
    title: string| null,
    content: string| null,
    topicId: number |null,
    isSearch: boolean
    onSearch: 
    (anywhere: string | null, content:string | null,
        title:string| null, topic:number| null)=>void,
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
    const classes = useStyles();

    const isSearch = !!anywhere || !!content || !!title || !!topic;
    const onSearch = ()=>{
        setOpen(false)
        props.onSearch(anywhere,content,title,topic)
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
                    renderInput={(params) => <TextField {...params} label="Topic" variant="outlined" />}
                    />
                </form>
            </Paper>
        );
    else if(props.isSearch)
        return(
                <Box display="flex" className={classes.panel}>
                    <Typography align="center">{`${props.count} question found on ${props.pages} page`}</Typography>
                    <Box flexGrow={1}/>
                    <Button 
                        onClick={()=>setOpen(true)}
                        variant="outlined">{isSearch?"Edit search":"Detailed search"}</Button>
                </Box>
            );
    else
    return (
        <Box display="flex" className={classes.panel}>
            <Box flexGrow={1}/>
            <TextField variant="outlined" size="small" onChange={e => setAnywhere(e.target.value)}></TextField>
            <Button onClick={()=>props.onSearch(anywhere,null,null,null)}>Search</Button>
        </Box>
    );
}

export default SearchPanel;