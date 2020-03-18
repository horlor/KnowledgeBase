import React from 'react';
import { Box, Hidden, Grid } from '@material-ui/core';
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
             switchSelected} = useUserListHook();
    if(loading)
        return <LoadingView></LoadingView>;
    if(error)
        return <ErrorView title={error.code} message={error.description}/>;
    return (
        <Grid container>
                {
                    users.map( user => 
                        <Grid item xs={12} md={6}  lg={4} xl={3} key={user.userName}>

                    <UserCard 
                         user={user}
                         to={`/users/${user.userName}`}
                    />
                    </Grid>
                    )
                }
        </Grid>
    );
}


export default UserPage;