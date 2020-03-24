import React, { useState } from 'react';
import EditProfileView from '../user/EditProfileView';
import { useProfileHook } from '../../hooks/UserHooks';
import ErrorView from '../common/ErrorView';
import LoadingView from '../common/LoadingView';
import UserDetailView from '../user/UserDetailView';

interface IProps{

}

const ProfilePage : React.FC<IProps> = (props) =>{
    const { profile, topics, save, edit, setEdit } = useProfileHook();
    const {error, loading, user} = profile;
    if(error){
        return <ErrorView title={error.code} message={error.description}/>;
    }
    if(!user)
        return <LoadingView/>;
    else if(!edit)
            return <UserDetailView user={user} editable={true} onEditClick={()=> setEdit(true)}/>
        else
            return <EditProfileView user={user} availableTopics={topics?topics:[]} onSubmit={save}/>
}

export default ProfilePage;