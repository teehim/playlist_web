import React from 'react';
import { Box, Grid, Typography, List, Avatar, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router-dom";

const useStyles = theme => ({
    root: {
        flexGrow: 1,
    },
    avatar: {
        width: '35px',
        height: '35px',
        margin: '10px 10px 10px 0px'
    },
    profile: {
        backgroundColor: theme.palette.background.paper
    },
    name: {
        'margin-right': '15px'
    },
    playlist_grid: {
        'margin-left': '30px'
    },
    playlist: {
        width: '100%',
        maxWidth: 480,
        'margin-top': '15px',
        'padding-top': '0px'
    },
    playlist_item: {
        'padding': '0px',
        'margin-bottom': '10px',
        backgroundColor: theme.palette.background.paper
    },
    playlist_avatar: {
        width: '50px',
        height: '50px',
        margin: '0px 15px 0px 0px'
    },
})

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            access_token: this.props.location.state? this.props.location.state.access_token: '',
            user: this.props.location.state? this.props.location.state.user: null
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
                            <Typography component="h7" variant="h7" display="inline" className={classes.name}>
                                {this.state.user? this.state.user.display_name: ""}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} className={classes.playlist_grid}>
                        <Typography variant="h4">
                            Playlists
                        </Typography>
                        <List className={classes.playlist}>
                            {this.state.user? this.state.user.playlists.map((playlist) => {
                                return (
                                    <ListItem className={classes.playlist_item} button>
                                        <ListItemAvatar>
                                            <Avatar
                                                src={playlist.images[0].url}
                                                variant='square'
                                                className={classes.playlist_avatar}
                                            />
                                        </ListItemAvatar>
                                        <ListItemText primary={playlist.name} secondary={playlist.track_counts + ' Songs'} />
                                    </ListItem>
                                );
                            }):''}
                        </List>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withRouter(withStyles(useStyles)(Home));