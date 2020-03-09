import React from 'react';
import Container from '@material-ui/core/Container';
import { List, ListItem, ListItemText, Paper, Typography, makeStyles } from '@material-ui/core';
import { useUserListHook } from '../../hooks/UserHooks';
import LoadingView from '../common/LoadingView';
import ErrorView from '../common/ErrorView';
import UserCard from '../user/UserCard';


interface IProps
{

}

const UserPage : React.FC<IProps> = (props) =>{
    const {users, error, loading} = useUserListHook();

    console.log(users);
    if(loading)
        return <LoadingView></LoadingView>;
    if(error)
        return <ErrorView title={error.code} message={error.description}/>;
    return (
        <Container maxWidth="xl">
                {
                    users.map( user => 
                    <UserCard key={user.userName}
                         username={user.userName} email={user.email}
                    />)
                }
        </Container>
    );
}


export default UserPage;