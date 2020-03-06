import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Progress from "@material-ui/core/CircularProgress";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Link as RouterLink} from "react-router-dom"
import { useForm } from 'react-hook-form';
import { useRegisterHook } from '../../redux/user/UserHooks';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(0.5),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error:{
    color: "red",
  },
  progressSpace:{
    display:"flex",
    alignItems:"center",
    justifyContent: "center"
  },
  success:{
    backgroundColor:theme.palette.success.main,
    color:theme.palette.text.primary,
    margin: theme.spacing(3, 0, 2),
  }
}));

interface IFormData{
    username: string,
    email: string,
    password: string,
    password2: string
}

const RegisterPage : React.FC = () => {
    const classes = useStyles();
    const {register, handleSubmit, errors, watch, } = useForm<IFormData>({mode:"onBlur"});
    const {loading, success, registerFun, errorList} = useRegisterHook();
    const [passwordError, setPasswordError] = useState<string>();

    const onSubmit  = (data: IFormData) =>{
        registerFun({
            username: data.username,
            email: data.email,
            password: data.password
        });
    }

    const passwordValidate = () =>{
        setPasswordError(undefined)
        let pw1 = watch("password");
        let pw2 = watch("password2");
        if(pw1 !== pw2)
            setPasswordError("The passwords do not match");
        console.log(watch())
    }

    return (
        <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
            Sign up
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
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
                </Grid>
                <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    required
                    error={!!errors.email}
                    helperText={errors.email?"Please enter a valid email address":""}
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    inputRef={register({pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/igm , 
                                 })}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    error={!!errors.password}
                    helperText={errors.password?"The password must have an upper and a lower case letter and a number, and must be 8 charachters long.":""}
                    autoComplete="current-password"
                    inputRef={register({pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/ })}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password2"
                    label="Password Again"
                    type="password"
                    id="password2"
                    autoComplete="current-password"
                    inputRef={register}
                    error={!!passwordError}
                    helperText={passwordError}
                    onBlur={passwordValidate}
                />
                </Grid>
                <Grid item xs={12}>
                <FormControlLabel
                    control={<Checkbox value="allowDataHandling" color="primary" />}
                    label="I consent to the using of my data."
                />
                </Grid>
            </Grid>
            {errorList.map(e => <Typography className={classes.error}>{e.description}</Typography>)}
            <div className={classes.progressSpace} >
            {loading?
              <Progress/>
            :
            success?
              <Button
                fullWidth
                variant="contained"
                className={classes.success}
                component={RouterLink}
                to="/login"
                 >Login now</Button>
            :
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                Sign Up
            </Button>
            }
            </div>
            <Grid container justify="flex-end">
                <Grid item>
                <Link component={RouterLink} to="/login" variant="body2">
                    Already have an account? Sign in
                </Link>
                </Grid>
            </Grid>
            </form>
        </div>
        <Box mt={5}>
            {/**Copyright info could be here */}
        </Box>
    </Container>
  );
}

export default RegisterPage;