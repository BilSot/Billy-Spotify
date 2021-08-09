import React, {ChangeEvent} from "react";
import TrackList from "./TrackList";
import {BillySpotifyStateModel, PlaylistModel, TrackModel} from "../types/models";
import {connect, ConnectedProps} from "react-redux";

interface PlaylistDropdownProps {
    playlists: PlaylistModel[],
    fetchTracksFromPlaylist: (playlistId: string) => void
}

const PlaylistDropdown: React.FC<PlaylistDropdownPropsFromRedux> = ({playlists, fetchTracksFromPlaylist, tracks}) => {

    const handleOnSelect = (event: ChangeEvent<HTMLSelectElement>) => {
        fetchTracksFromPlaylist(event.target.value);
    }

    return (
        <div>
            <select onChange={handleOnSelect}>
                <option value="">Select playlist</option>
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
        tracks: state.trackList.tracks
    };
};

export type PlaylistDropdownPropsFromRedux = ConnectedProps<typeof connector>;
const connector = connect(mapStateToProps)
export default connector(PlaylistDropdown);
