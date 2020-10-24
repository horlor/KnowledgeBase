import React, { useState } from 'react';
import EditProfileView from '../user/EditProfileView';
import ErrorPage from '../common/ErrorPage';
import LoadingView from '../common/LoadingView';
import UserDetailView from '../user/UserDetailView';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useProfileHook } from '../../hooks/ProfileHook';

interface IProps{

}

const ProfilePage : React.FC<IProps> = (props) =>{
    const { profile, topics, save, edit, setEdit, closeError, deleteAvatar } = useProfileHook();
    const {error, loading, user} = profile;
    return (
        <>
        {
            error?<ErrorPage error={error}/>:
            (!user)?<LoadingView/>:
            (!edit)?<UserDetailView user={user} editable={true} onEditClick={()=> setEdit(true)}/>:
            <EditProfileView user={user} availableTopics={topics?topics:[]} onSubmit={save}
             saveLoading={profile.saveLoading} saveError={profile.saveError}
             onDrop={()=> setEdit(false)} onErrorClose={closeError} deleteAvatar={deleteAvatar}
             />
        }

        </>
    );
}

export default ProfilePage;