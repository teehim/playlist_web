import React from 'react';
import { Box, Grid, Typography, List, Avatar } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const useStyles = theme => ({
    root: {
        flexGrow: 1,
    },
    avatar: {
        width: '50px',
        height: '50px',
        margin: '15px 15px 15px 40px'
    },
    profile: {
        backgroundColor: theme.palette.background.paper
    },
    name: {
        'margin-right': '30px'
    },
    playlist_header: {
        'margin-left': '15px'
    },
    playlist: {
        width: '100%',
        maxWidth: 500,
        backgroundColor: theme.palette.background.paper,
        'margin-top': '10px'
    }
})

class Home extends React.Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = { 
            access_token: props.access_token,
            user: props.user
        };
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Box display='flex' alignItems="center" className={classes.profile} justifyContent="flex-end">
                            <Avatar 
                                className={classes.avatar}
                                src={this.state.user? this.state.user.images[0].url: ''}
                                variant={'circle'}
                            />
                            <Typography component="h6" variant="h6" display="inline" className={classes.name}>
                                {this.state.user? this.state.user.display_name: ""}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} className={classes.playlist_header}>
                        <Typography variant="h4">
                            Playlists
                        </Typography>
                        <List className={classes.playlist}>
                            {/* {this.state.user? this.state.user.playlists.map((playlist) => {

                            }):''} */}
                        </List>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(useStyles)(Home);