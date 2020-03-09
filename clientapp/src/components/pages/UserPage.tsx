import React from 'react';
import { Box } from '@material-ui/core';
import { useUserListHook } from '../../hooks/UserHooks';
import LoadingView from '../common/LoadingView';
import ErrorView from '../common/ErrorView';
import UserCard from '../user/UserCard';
import UserDetailView from '../user/UserDetailView';


interface IProps
{

}

const UserPage : React.FC<IProps> = (props) =>{
    const {users, error, loading,
        selectedError, selectedLoading, selectedUser, switchSelected} = useUserListHook();
    if(loading)
        return <LoadingView></LoadingView>;
    if(error)
        return <ErrorView title={error.code} message={error.description}/>;
    return (
        <Box display="flex" flexDirection="row" justifyContent="spacearound" width="100%">
            <Box width="360px" flexShrink={0}>
                {
                    users.map( user => 
                    <UserCard key={user.userName}
                         username={user.userName} email={user.email}
                        onClick={()=>switchSelected(user.userName)}
                    />)
                }
            </Box>
            <Box flexGrow={1}>
                {selectedLoading?<LoadingView/>:
                    selectedUser?
                    <UserDetailView user={selectedUser}/>
                    :<></>
                }
            </Box>
        </Box>
    );
}


export default UserPage;