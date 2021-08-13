import './App.css';
import {getAuthURL, SpotifyToken} from "./authorization";
import React, {useEffect, useState} from "react";
import {
    HashParam,
    BillySpotifyStateModel,
    UserDetailsModel, PlaylistModel, TrackModel, DraftPlaylist
} from "./types/models";
import {bindActionCreators} from "redux";
import {connect, ConnectedProps} from "react-redux";
import {setToken} from "./redux/reducers/tokenReducer/tokenActions";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import {fetchUserError, fetchUserSuccess} from "./redux/reducers/userDetailsReducer/userDetailsActions";
import axios from "axios";
import {
    createPlaylist,
    fetchAllPlaylists,
    setSelectedPlaylist,
    setTracksInPlaylist
} from "./redux/reducers/playlistReducer/playlistActions";
import {setTracks} from "./redux/reducers/trackReducer/trackActions";
import {Button} from "react-bootstrap";
import {setTheme} from "./redux/reducers/themeReducer/themeActions";

const App: React.FC<PropsFromRedux> = (props) => {

    let hash: SpotifyToken = {
        access_token: '',
        token_type: '',
        expires_in: '',
        state: ''
    };

    onLoad();

    useEffect(() => {
        if (props.token !== "") {
            fetchUser();
        }
    }, [props.token]);

    function onLoad() {
        hash = getHashFromURL();
        if (hash.access_token) {
            props.setToken(hash.access_token);
        } else {
            window.location.href = getAuthURL();
        }
    }

    function getHashFromURL(): SpotifyToken {
        let hashParams = window.location.hash
            .substring(1)
            .split("&")
            .reduce(function (initial: HashParam, item) {
                if (item) {
                    var parts = item.split("=");
                    initial[parts[0]] = decodeURIComponent(parts[1]);
                }
                return initial;
            }, {});

        return {
            access_token: hashParams["access_token"],
            state: hashParams["state"],
            token_type: hashParams["token_type"],
            expires_in: hashParams["expires_in"]
        }
    }

    function fetchUser(): void {
        axios.get("https://api.spotify.com/v1/me", {
            headers: {'Authorization': 'Bearer ' + props.token}
        })
            .then((data) => {
                let user: UserDetailsModel = {
                    id: data.data.id,
                    display_name: data.data.display_name,
                    image: data.data.images[0].url,
                    loaded: true
                };
                props.fetchUserSuccess(user);
                fetchUserPlaylists();
            })
            .catch((error) => {
                props.fetchUserError();
            })
    }

    function fetchUserPlaylists(): void {
        axios.get("https://api.spotify.com/v1/me/playlists", {
            headers: {'Authorization': 'Bearer ' + props.token}
        })
            .then((data) => {
                let playlists: PlaylistModel[] = [];
                for (let item in data.data.items) {
                    playlists.push({
                        ...data.data.items[item],
                        tracks: []
                    });
                }
                props.fetchAllPlaylists(playlists);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    function createNewPlaylist(playlist: DraftPlaylist): void {
        axios.post(`https://api.spotify.com/v1/users/${props.user.id}/playlists`, playlist, {
                headers: {
                    'Authorization': 'Bearer ' + props.token,
                    'Content-Type': 'application/json'
                }
            }
        )
            .then((response) => {
                console.log(response);
                let newlyCreatedPlaylist: PlaylistModel = {
                    id: response.data.id,
                    name: response.data.name,
                    description: response.data.description,
                    tracks: []
                }
                props.createPlaylist(newlyCreatedPlaylist);
            })
            .catch((error) => console.log(error));
    }

    function fetchTracksFromPlaylist(playlistId: string): void {

        axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
            headers: {'Authorization': 'Bearer ' + props.token}
        })
            .then((data) => {
                let tracksInPlaylist: TrackModel[] = [];
                for (let item in data.data.items) {
                    tracksInPlaylist.push({
                        id: data.data.items[item].track.id,
                        name: data.data.items[item].track.name,
                        uri: data.data.items[item].track.uri,
                        album: data.data.items[item].track.album.name,
                        artists: data.data.items[item].track.artists,
                        image: data.data.items[item].track.album.images[2].url,
                        duration: data.data.items[item].track.duration_ms
                    });
                }
                props.setTracks(tracksInPlaylist);
                let playlist = props.playlists.find((p) => p.id === playlistId);
                if(playlist) {
                    props.setTracksInPlaylist(tracksInPlaylist, playlist);
                }
            })
            .catch((error) => {

            })
    }


    return (
        <div className="App">
            {!props.token && (
                <p>Start page</p>
            )}
            {props.token && (
                <div>
                    <Header loggedInUser={props.user} createNewPlaylist={createNewPlaylist}/>
                    <MainContent playlists={props.playlists} fetchTracksFromPlaylist={fetchTracksFromPlaylist}/>
                </div>
            )}
        </div>
    )
}

const mapStateToProps = (state: BillySpotifyStateModel) => {
    return {
        theme: state.themeState.theme,
        token: state.tokenState.token,
        user: state.user,
        playlists: state.playlistsData.playlists,
        tracks: state.trackList.tracks
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators(
        {
            setToken,
            fetchUserSuccess,
            fetchUserError,
            fetchAllPlaylists,
            setTracksInPlaylist,
            setTracks,
            createPlaylist,
            setSelectedPlaylist
        },
        dispatch
    );
};

export type PropsFromRedux = ConnectedProps<typeof connector>;
const connector = connect(mapStateToProps, mapDispatchToProps)
export default connector(App);
