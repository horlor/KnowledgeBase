import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../redux/Store"
import { useEffect, useState } from "react";
import { LoadTopicsThunk } from "../redux/reducers/TopicThunks";
import { Topic, TopicDetailed } from "../models/Topic";
import { LoadTopicDetailedFromApi, UpdateTopicApi } from "../api/TopicApi";

export const useTopicHook = () =>{
    const dispatch = useDispatch()
    const topics = useSelector((state: RootState)=> state.topic.topics);
    const error = useSelector((state: RootState)=> state.topic.error);
    const [selected, setSelected ] = useState<TopicDetailed>();

    useEffect(()=>{
        dispatch(LoadTopicsThunk());
    },[dispatch])

    const selectTopic = async (t: Topic) =>{
        try{
            setSelected(undefined);
            let topic = await LoadTopicDetailedFromApi(t.id);
            setSelected(topic);
        }
        catch(exc){
            console.log("detailed load failed");
        }
    }

    const saveChanges = async (t: TopicDetailed)=>{
        try{
            await UpdateTopicApi(t);
        }
        catch(exc){
            console.log(exc)
        }
    }

    return {topics, error, selectTopic, selected, saveChanges };
}