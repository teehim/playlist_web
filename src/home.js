import React from 'react';
import { 
    Box, 
    Grid, 
    Typography, 
    List, 
    Avatar, 
    ListItem, 
    ListItemAvatar, 
    ListItemText, 
    ListItemSecondaryAction,
    IconButton
} 
from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import GroupWorkOutlinedIcon from '@material-ui/icons/GroupWorkOutlined';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router-dom";
import { serverUrl } from './settings';

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
    result_item: {
        'margin-bottom': '10px',
        backgroundColor: theme.palette.background.paper
    },
    playlist_avatar: {
        width: '50px',
        height: '50px',
        margin: '0px 15px 0px 0px'
    },
    action_item: {
        'padding-left': '0px',
        'margin-bottom': '10px'
    },
    actionlist: {
        'margin-top': '10px'
    }
})

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            access_token: this.props.location.state? this.props.location.state.access_token: '',
            user: this.props.location.state? this.props.location.state.user: null,
            playlist: null,
            cluster_playlists: null,
            cluster_playlist: null,
            track_list: null
        };
    }

    clusterPlaylist() {
        const url = serverUrl + "/cluster_playlist"
        const data = {
            id: this.state.playlist.id,
            token: this.state.access_token
        }
        fetch(url, {
            method: "post",
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then((response) => {
            return response.json()
        })
        .then((resp) => {
            this.setState({ cluster_playlists: resp.playlists })
        })
        .catch((error) => {
            console.log(error, "catch the hoop")
        })
    }

    createPlaylist() {
        const pl_tracks = this.state.cluster_playlist.tracks
        let track_ids = []
        pl_tracks.forEach(track => {
            track_ids.push(track.id)
        });
        const url = serverUrl + "/create_playlist"
        const data = {
            name: this.state.cluster_playlist.name,
            token: this.state.access_token,
            track_ids: track_ids,
            user_id: this.state.user.id
        }
        fetch(url, {
            method: "post",
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then((response) => {
            return response.json()
        })
        .then((resp) => {
            console.log(resp)
        })
        .catch((error) => {
            console.log(error, "catch the hoop")
        })
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
                    <Grid item xs={3}>
                        <Typography variant="h4" style={{ 'margin-left': '35px' }}>
                            Playlists
                        </Typography>
                        <List className={classes.playlist} style={{ 'margin-left': '35px' }}>
                            {this.state.user? this.state.user.playlists.map((playlist) => {
                                return (
                                    <ListItem 
                                        className={classes.playlist_item}
                                        onClick={() => this.setState({ 
                                            playlist: playlist,
                                            cluster_playlists: null
                                        })}
                                        button
                                    >
                                        <ListItemAvatar>
                                            <Avatar
                                                src={playlist.images[0].url}
                                                variant='square'
                                                className={classes.playlist_avatar}
                                            />
                                        </ListItemAvatar>
                                        <ListItemText primary={playlist.name} secondary={playlist.track_counts + ' Songs'} />
                                        <ListItemSecondaryAction>
                                            <ListItemSecondaryAction>
                                                <IconButton>
                                                    <ArrowForwardIosIcon/>
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                );
                            }):''}
                        </List>
                    </Grid>
                    {
                        this.state.playlist?
                        <Grid item xs={3}>
                            <Typography variant="h4">
                                {this.state.playlist.name}
                            </Typography>
                            <List className={classes.actionlist}>
                                <ListItem 
                                    className={classes.action_item} 
                                    onClick={this.clusterPlaylist.bind(this)}
                                    button
                                >
                                    <GroupWorkOutlinedIcon style={{ fontSize: 35, 'margin-right': 10 }} />
                                    <ListItemText primary='Cluster Playlist'/>
                                </ListItem>
                            </List>
                        </Grid>
                        :''
                    }
                    {
                        this.state.cluster_playlists?
                        <Grid item xs={3}>
                            <Typography variant="h4">
                                Results
                            </Typography>
                            <List className={classes.playlist}>
                                {this.state.cluster_playlists.map((playlist) => {
                                    return (
                                        <ListItem 
                                            className={classes.result_item}
                                            onClick={() => this.setState({ 
                                                track_list: playlist.tracks,
                                                cluster_playlist: playlist
                                            })}
                                            button
                                        >
                                            <ListItemText primary={playlist.name} secondary={playlist.track_counts + ' Songs'} />
                                            <ListItemSecondaryAction>
                                            <ListItemSecondaryAction>
                                                <IconButton>
                                                    <ArrowForwardIosIcon/>
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    );
                                })}
                            </List>
                        </Grid>
                        :''
                    }
                    {
                        this.state.track_list?
                        <Grid item xs={3}>
                            <Typography variant="h4">
                                Tracks
                            </Typography>
                            <List className={classes.playlist}>
                                <ListItem 
                                        className={classes.action_item} 
                                        onClick={this.createPlaylist.bind(this)}
                                        button
                                    >
                                    <AddOutlinedIcon style={{ fontSize: 35, 'margin-right': 10 }} />
                                    <ListItemText primary='Create Playlist'/>
                                </ListItem>
                                {this.state.track_list.map((track) => {
                                    return (
                                        <ListItem 
                                            className={classes.result_item}
                                            // onClick={() => this.setState({ 
                                            //     playlist: playlist 
                                            // })}
                                            button
                                        >
                                            <ListItemText primary={track.name} secondary={track.artist} />
                                        </ListItem>
                                    );
                                })}
                            </List>
                        </Grid>
                        :''
                    }
                </Grid>
            </div>
        );
    }
}

export default withRouter(withStyles(useStyles)(Home));