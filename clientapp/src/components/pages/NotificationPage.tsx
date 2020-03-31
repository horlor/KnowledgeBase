import React from 'react'
import { Container, Typography } from '@material-ui/core';
import { useNotifications } from '../../hooks/NotificationHooks';
import NotificationView from '../notification/NotificationView';
import {MyNotification} from '../../models/Notification'
import LoadingView from '../common/LoadingView';
import ErrorView from '../common/ErrorView';

interface IProps{

}

const NotificationPage : React.FC<IProps> = (props) =>{
    const {notifications, error, loading, deleteNotification} = useNotifications();
    if(error)
        return <ErrorView title={error.code} message={error.description}/>
    if(loading)
        return <LoadingView/>;
    return (
        <Container maxWidth="lg">
            {
            notifications.length != 0
            ?
            notifications.map(n => 
            <NotificationView title={n.title} message={n.content} onDelete={()=>deleteNotification(n)} key={n.id}/>
            )
            :
            <Typography variant="h6">You have no notifications...</Typography>
            }
        </Container>
    );
}

export default NotificationPage;