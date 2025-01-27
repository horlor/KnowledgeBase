import React from 'react';
import { Container, Paper, Box, Avatar, Typography, Divider, Chip, makeStyles } from '@material-ui/core';
import { UserDetailed, User } from '../../models/User';
import { RouteComponentProps } from 'react-router-dom';
import { useSelectedUserHook } from '../../hooks/UserHooks';
import LoadingView from '../common/LoadingView';
import ErrorPage from '../common/ErrorPage';
import UserDetailView from '../user/UserDetailView';


type IProps = RouteComponentProps<{
    username: string;
}>;

const UserDetailPage : React.FC<IProps> = (props: IProps) =>{
    const {user, loading, error} = useSelectedUserHook(props.match.params.username);
    if(loading)
        return <LoadingView/>;
    if(error!== undefined)
        return <ErrorPage error={error}/>;
    if(user!==undefined)
        return (
        <Container maxWidth="xl">
            <UserDetailView user={user} editable={false}/>
        </Container>
    );
    else
        return <></>;
}

export default UserDetailPage;