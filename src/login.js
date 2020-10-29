import React from 'react';
import './index.css';
import { Button, Grid, Typography, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import SpotifyLogin from 'react-spotify-login';
import { clientId, redirectUri, serverUrl } from './settings';
 
const onSuccess = response => {
    this.setState(prevState => ({ access_token: response.access_token }))
    const url = serverUrl + "/login"
    fetch(url, {
        method: "post",
        // mode:'no-cors',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(response)
    })
    .then((resp) => {
        console.log(resp.json())
    })
    .catch((error) => {
        console.log(error, "catch the hoop")
    })
};
const onFailure = response => console.error(response);

const useStyles = theme => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://64.media.tumblr.com/296bb0991b7a5be587e340286108f44a/c0ff73e75a9acc38-00/s1280x1920/7bcacaf0aede010ac6c5796d85762aeecb173d73.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(45, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        background: '#1DB954',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        fontSize: '16px'
    }
});

class Login extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <Grid container component="main" className={classes.root}>
                <Grid item xs={false} sm={4} md={7} className={classes.image} />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <SpotifyLogin className={classes.submit} clientId={clientId}
                            redirectUri={redirectUri}
                            onSuccess={onSuccess}
                            onFailure={onFailure}/>
                    </div>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(useStyles)(Login);