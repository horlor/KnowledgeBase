import React from 'react'
import { Card, CardHeader, CardContent, Typography, Paper, makeStyles, Box, Button, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import ClearIcon from '@material-ui/icons/Clear';





const useStyles = makeStyles(theme => ({
    surface:{
        padding: theme.spacing(1),
        margin: theme.spacing(1)
    }
}))

interface IProps{
    title: string,
    message: string,
    onDelete?: ()=>void,
    onFinish?: ()=>void
}

const NotificationView : React.FC<IProps> = props =>{
    const classes = useStyles();
    return (
        <Paper className={classes.surface}>
            <Typography variant="h6">{props.title}</Typography>
            <Typography variant="body1">{props.message}</Typography>
            <Box display="flex" flexDirection="row-reverse">
                <Button endIcon={<DeleteIcon/>}
                    onClick={props.onDelete}    
                >
                    DELETE
                </Button>
                <Button endIcon={<ClearIcon/>}
                    onClick={props.onFinish}
                >
                    MARK AS FINISHED
                </Button>
            </Box>
        </Paper>
    );
}

NotificationView.defaultProps={
    onDelete: undefined,
    onFinish: undefined,
}

export default NotificationView;