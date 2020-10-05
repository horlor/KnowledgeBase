import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Paper } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { useLoginHook } from '../../hooks/LoginHooks';
import { Redirect } from 'react-router';
import {Link as RouterLink} from 'react-router-dom';

interface IProps{

}

const useStyles = makeStyles(theme => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    error:{
        color: theme.palette.error.main,
    }
  }));


interface IFormData{
    username: string,
    password: string,
    remember : boolean,
}

export const LoginPage : React.FC<IProps> = (props) =>{
    const classes = useStyles();
    const {register, handleSubmit} = useForm<IFormData>();
    const {loggedIn, loginFun, error} =  useLoginHook();
    const onSubmit = async (data: IFormData) =>{
        await loginFun(data.username, data.password, data.remember);
    }
    if(loggedIn)
        return <Redirect to="/"/>
    return (
        <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
            Sign in
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                inputRef={register}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                inputRef={register}
            />
            {
                error?
                <Typography className={classes.error}>The username or the password is not right</Typography>:""
            }
            <FormControlLabel
                control={<Checkbox inputRef={register} name="remember" color="primary"/>}
                label="Remember me"
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                Sign In
            </Button>
            <Grid container>
                <Grid item xs>
                <Link component={RouterLink} to="/password_recovery" variant="body2">
                    Forgot password?
                </Link>
                </Grid>
                <Grid item>
                <Link component={RouterLink} to="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                </Link>
                </Grid>
            </Grid>
            </form>
        </div>
        <Box mt={8}>
        </Box>
        </Container>
    );
      
}

export default LoginPage;