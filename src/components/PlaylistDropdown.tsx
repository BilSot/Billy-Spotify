import React, {ChangeEvent, useEffect} from "react";
import TrackList from "./TrackList";
import {BillySpotifyStateModel, PlaylistModel} from "../types/models";
import {connect, ConnectedProps} from "react-redux";
import {bindActionCreators} from "redux";
import {setTracks} from "../redux/reducers/trackReducer/trackActions";
import {setSelectedPlaylist} from "../redux/reducers/playlistReducer/playlistActions";

interface PlaylistDropdownProps {
    playlists: PlaylistModel[],
    fetchTracksFromPlaylist: (playlistId: string) => void
}

const PlaylistDropdown: React.FC<PlaylistDropdownPropsFromRedux> = ({playlists, fetchTracksFromPlaylist, tracks, setTracks, setSelectedPlaylist, activePlaylist}) => {
    useEffect(() => {
        if(playlists.length > 0) {
            setSelectedPlaylist(playlists[0].id);
            fetchTracksFromPlaylist(playlists[0].id);
        }
    }, [playlists]);

    const handleOnSelect = (event: ChangeEvent<HTMLSelectElement>) => {
        let playlist: PlaylistModel | undefined = playlists.find((p) => p.id === event.target.value);
        if(playlist) {
            setSelectedPlaylist(playlist.id);
            if(playlist.tracks.length === 0) {
                fetchTracksFromPlaylist(event.target.value);
            }else{
                setTracks(playlist.tracks);
            }
        }
    }

    return (
        <div>
            <select onChange={handleOnSelect}>
                {playlists.map((playlist) => {
                    return <option key={playlist.id} value={playlist.id}>{playlist.name}</option>
                })}
            </select>
            <TrackList tracks={tracks}/>
        </div>
    )
}

const mapStateToProps = (state: BillySpotifyStateModel, ownProps: PlaylistDropdownProps) => {
    return {
        ...ownProps,
        tracks: state.trackList.tracks,
        activePlaylist: state.playlistsData.activePlaylist
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        setTracks,
        setSelectedPlaylist
    }, dispatch)
};

export type PlaylistDropdownPropsFromRedux = ConnectedProps<typeof connector>;
const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(PlaylistDropdown);
