import React from 'react';
import { Container, Typography } from '@material-ui/core';

interface IProps{

}

const NotLoggedInView : React.FC<IProps> = (props) => {
    return (        
        <Container maxWidth="xl">
            <Typography>You must be logged on to see this page</Typography>
        </Container>
    );

}

export default NotLoggedInView;