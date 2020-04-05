import React from 'react'
import { Container, Typography, makeStyles } from '@material-ui/core';
import { useNotifications } from '../../hooks/NotificationHooks';
import NotificationView from '../notification/NotificationView';
import LoadingView from '../common/LoadingView';
import ErrorView from '../common/ErrorView';

interface IProps{

}

const NotificationPage : React.FC<IProps> = () =>{
    const {notifications, error, loading, deleteNotification,setFinish} = useNotifications();
    if(error)
        return <ErrorView title={error.code} message={error.description}/>
    if(loading)
        return <LoadingView/>;
    return (
        <Container maxWidth="lg">
            {
            notifications.length !== 0
            ?
            notifications.map(n => 
            <NotificationView key={n.id} title={n.title} message={n.content} finished={n.finished}
                 onDelete={()=>deleteNotification(n)}
                 onFinish={()=>setFinish(n)}
                 linkTo={`/questions/${n.questionId}`}
            />
            )
            :
            <Typography variant="h6">You have no notifications...</Typography>
            }
        </Container>
    );
}

export default NotificationPage;