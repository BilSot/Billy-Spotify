import './App.css';
import {getAuthURL, SpotifyToken} from "./authorization";
import React, {useEffect} from "react";
import {
    HashParam,
    BillySpotifyStateModel,
    PlaylistModel, DraftPlaylist
} from "./types/models";
import {bindActionCreators} from "redux";
import {connect, ConnectedProps} from "react-redux";
import {setToken} from "./redux/reducers/tokenReducer/tokenActions";
import MainContent from "./components/MainContent/MainContent";
import {
    fetchUserRequest,
} from "./redux/reducers/userDetailsReducer/userDetailsActions";
import axios from "axios";
import {
    createPlaylist,
    fetchAllPlaylists,
    setSelectedPlaylist
} from "./redux/reducers/playlistReducer/playlistActions";
import {fetchTracks} from "./redux/reducers/trackReducer/trackActions";
import UserDetails from "./components/UserDetails/UserDetails";
import Search from "./components/Search/Search";

const App: React.FC<PropsFromRedux> = (props) => {

    let hash: SpotifyToken = {
        access_token: '',
        token_type: '',
        expires_in: '',
        state: ''
    };

    useEffect(() => {
        hash = getHashFromURL();
        if (hash.access_token) {
            props.setToken(hash.access_token);
        } else {
            window.location.href = getAuthURL();
        }
    }, []);

    useEffect(() => {
        if (props.token !== "") {
            fetchUser();
        }
    }, [props.token]);

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
        window.location.hash = "";

        return {
            access_token: hashParams["access_token"],
            state: hashParams["state"],
            token_type: hashParams["token_type"],
            expires_in: hashParams["expires_in"]
        }
    }

    function fetchUser(): void {
        props.fetchUserRequest(props.token);
        props.fetchAllPlaylists(props.token);
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

        props.fetchTracks(props.token, playlistId);
    }


    return (
        <div className="App">
            {!props.token && (
                <p>Something went wrong, no valid token provided...</p>
            )}
            {props.token && (
                <>
                    <div className="left-content row">
                        <Search/>
                        <MainContent playlists={props.playlists} createNewPlaylist={createNewPlaylist} fetchTracksFromPlaylist={fetchTracksFromPlaylist}/>
                    </div>
                    <div className="right-content">
                        <UserDetails loggedInUser={props.user}/>
                    </div>
                </>
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
            fetchUserRequest,
            fetchAllPlaylists,
            fetchTracks,
            createPlaylist,
            setSelectedPlaylist
        },
        dispatch
    );
};

export type PropsFromRedux = ConnectedProps<typeof connector>;
const connector = connect(mapStateToProps, mapDispatchToProps)
export default connector(App);
