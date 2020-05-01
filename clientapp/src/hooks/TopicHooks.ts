import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../redux/Store"
import { useEffect, useState } from "react";
import { LoadTopicsThunk } from "../redux/reducers/TopicThunks";
import { Topic, TopicDetailed } from "../models/Topic";
import { LoadTopicDetailedFromApi, UpdateTopicApi, CreateTopicApi } from "../api/TopicApi";
import { UpdateTopicAction, CreateTopicAction } from "../redux/reducers/TopicReducer";

export const useTopicHook = () =>{
    const dispatch = useDispatch()
    const topics = useSelector((state: RootState)=> state.topic.topics);
    const error = useSelector((state: RootState)=> state.topic.error);
    const [selected, setSelected ] = useState<TopicDetailed|null>();
    const [newTopic, setNew] = useState(false);
    useEffect(()=>{
        dispatch(LoadTopicsThunk());
    },[dispatch])

    const selectTopic = async (t: Topic) =>{
        try{
            setSelected(undefined);
            setNew(false);
            let topic = await LoadTopicDetailedFromApi(t.id);
            setSelected(topic);
        }
        catch(exc){
            console.log("detailed load failed");
        }
    }

    const saveChanges = async (t: TopicDetailed)=>{
        if(newTopic){
            try{
                let newt = await CreateTopicApi(t);
                dispatch(CreateTopicAction(newt));
                setNew(false)
                selectTopic(newt);
            }
            catch( exc){
                console.log(exc);
            }
        }
        else{
            try{
                console.log(t)
                await UpdateTopicApi(t);
                dispatch(UpdateTopicAction(t))
            }
            catch(exc){
                console.log(exc)
            }
        }
    }

    const createNew = () =>{
        setNew(true)
    }

    return {topics, error, selectTopic, selected, saveChanges, newTopic, createNew };
}

export const useTopicState = () =>{
    const topics = useSelector((state: RootState)=> state.topic)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(LoadTopicsThunk())
    },[dispatch])

    return topics.topics;
}