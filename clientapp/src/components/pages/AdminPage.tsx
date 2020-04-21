import React from 'react';
import { Container, Typography } from '@material-ui/core';

interface IProps{

}

const AdminPage : React.FC<IProps> = (props: IProps) =>{

    return (
        <Container>
            <Typography>AdminPage</Typography>
        </Container>
    );
}

export default AdminPage;