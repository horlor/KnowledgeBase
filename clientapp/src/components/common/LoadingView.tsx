import React from "react"
import Progress from "@material-ui/core/CircularProgress"
import { createStyles, Box, makeStyles } from "@material-ui/core";

interface IProps{

}
const useStyles = makeStyles({
    container :{
        display: "flex",
        alignContent :"space-around",
        justifyContent: "center",
        width: "100%"
        
    },
    spinner:{
        marginTop:"10%",
        alignSelf: "center"
    }

});

const LoadingView : React.FC<IProps> = (props) =>{
    const classes = useStyles();
    return ( 
    <Box className={classes.container}>
        <Progress size="10%" className={classes.spinner}/>
    </Box>
    );
}

export default LoadingView;