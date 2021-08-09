import './App.css';
import {getAuthURL, SpotifyToken} from "./authorization";
import React, {useEffect} from "react";
import {
    HashParam,
    BillySpotifyStateModel,
    UserDetailsModel, PlaylistModel, TrackModel
} from "./types/models";
import {bindActionCreators} from "redux";
import {connect, ConnectedProps} from "react-redux";
import {setToken} from "./redux/reducers/tokenReducer/tokenActions";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import {fetchUserError, fetchUserSuccess} from "./redux/reducers/userDetailsReducer/userDetailsActions";
import axios from "axios";
import {fetchAllPlaylists} from "./redux/reducers/playlistReducer/playlistActions";
import {setTracks} from "./redux/reducers/trackReducer/trackActions";

const App: React.FC<PropsFromRedux> = (props) => {

    let hash: SpotifyToken = {
        access_token: '',
        token_type: '',
        expires_in: '',
        state: ''
    };

    onLoad();

    useEffect(() => {
        if(props.token !== "") {
            fetchUser();
        }
    }, [props.token]);

    function onLoad () {
        hash = getHashFromURL();
        if (hash.access_token) {
            props.setToken(hash.access_token);
        } else {
            window.location.href = getAuthURL();
        }
    }

    function getHashFromURL (): SpotifyToken {
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

    function fetchUser (): void {
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

    function fetchUserPlaylists (): void {
        axios.get("https://api.spotify.com/v1/me/playlists", {
            headers: {'Authorization': 'Bearer ' + props.token}
        })
            .then((data) => {
                let playlists: PlaylistModel[] = [];
                for (let item in data.data.items){
                    playlists.push(data.data.items[item]);
                }
                props.fetchAllPlaylists(playlists);
            })
            .catch((error) => {

            })
    }

    function fetchTracksFromPlaylist (playlistId: string): void {
        if(playlistId !== "") {
            axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                headers: {'Authorization': 'Bearer ' + props.token}
            })
                .then((data) => {
                    let tracksPerPlaylist: TrackModel[] = [];
                    for (let item in data.data.items) {
                        tracksPerPlaylist.push({
                            id: data.data.items[item].track.id,
                            name: data.data.items[item].track.name,
                            uri: data.data.items[item].track.uri,
                            album: data.data.items[item].track.album.name,
                            artist: data.data.items[item].track.artists,
                            image: data.data.items[item].track.album.images[2].url,
                            duration: data.data.items[item].track.duration_ms
                        });
                    }
                    props.setTracks(tracksPerPlaylist);
                })
                .catch((error) => {

                })
        }else{
            props.setTracks([]);
        }
    }


    return (
        <div className="App">
            {!props.token && (
                <p>Start page</p>
            )}
            {props.token && (
                <div>
                    <Header loggedInUser={props.user}/>
                    <MainContent playlists={props.playlists} fetchTracksFromPlaylist={fetchTracksFromPlaylist}/>
                </div>
            )}
        </div>
    )
}

const mapStateToProps = (state: BillySpotifyStateModel) => {
    return {
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
            setTracks
        },
        dispatch
    );
};

export type PropsFromRedux = ConnectedProps<typeof connector>;
const connector = connect(mapStateToProps, mapDispatchToProps)
export default connector(App);
