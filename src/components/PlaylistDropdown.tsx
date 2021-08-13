import React, {ChangeEvent, useEffect, useState} from "react";
import TrackList from "./TrackList";
import {BillySpotifyStateModel, PlaylistModel, TrackModel} from "../types/models";
import {connect, ConnectedProps} from "react-redux";
import {bindActionCreators} from "redux";
import {removeTrack, setTracks} from "../redux/reducers/trackReducer/trackActions";
import {removeTrackFromPlaylist, setSelectedPlaylist} from "../redux/reducers/playlistReducer/playlistActions";
import axios from "axios";

interface PlaylistDropdownProps {
    playlists: PlaylistModel[],
    fetchTracksFromPlaylist: (playlistId: string) => void
}

const PlaylistDropdown: React.FC<PlaylistDropdownPropsFromRedux> = ({
                                                                        token,
                                                                        playlists,
                                                                        activePlaylist,
                                                                        fetchTracksFromPlaylist,
                                                                        tracks,
                                                                        setTracks,
                                                                        setSelectedPlaylist,
                                                                        removeTrackFromPlaylist,
                                                                        removeTrack
                                                                    }) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (playlists.length > 0) {
            setSelectedPlaylist(playlists[0]);
            fetchTracksFromPlaylist(playlists[0].id);
        }
    }, [loaded]);

    useEffect(() => {
        setTimeout(() => {
            setLoaded(true);
        }, 500);
    }, []);

    const handleOnSelect = (event: ChangeEvent<HTMLSelectElement>) => {

        let playlist: PlaylistModel | undefined = playlists.find((p) => p.id === event.target.value);
        if (playlist) {
            setSelectedPlaylist(playlist);
            if (playlist.tracks.length === 0) {
                fetchTracksFromPlaylist(event.target.value);
            } else {
                setTracks(playlist.tracks);
            }
        }
    }

    const removeTrackFromTrackList = (track: TrackModel): void => {

        axios.delete(`https://api.spotify.com/v1/playlists/${activePlaylist.playlistId}/tracks`, {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            data: {
                "tracks": [{"uri": track.uri}]
            }
        })
            .then((response) => {
                if(response.status === 200){
                    removeTrackFromPlaylist(track, activePlaylist.playlist);
                    removeTrack(track);
                }
            })
            .catch((error) => console.error(error));
    }

    return (
        <div>
            <select onChange={handleOnSelect}>
                {playlists.map((playlist) => {
                    return <option key={playlist.id} value={playlist.id}>{playlist.name}</option>
                })}
            </select>
            <TrackList tracks={tracks} removeTrack={removeTrackFromTrackList}/>
        </div>
    )
}

const mapStateToProps = (state: BillySpotifyStateModel, ownProps: PlaylistDropdownProps) => {
    return {
        ...ownProps,
        token: state.tokenState.token,
        tracks: state.trackList.tracks,
        activePlaylist: state.playlistsData.activePlaylist
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        setTracks,
        setSelectedPlaylist,
        removeTrackFromPlaylist,
        removeTrack
    }, dispatch)
};

export type PlaylistDropdownPropsFromRedux = ConnectedProps<typeof connector>;
const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(PlaylistDropdown);
