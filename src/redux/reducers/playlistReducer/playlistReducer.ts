import {Reducer} from "redux";
import {
    AddTracksToPlaylistAction, defaultPlaylist,
    PlaylistAction, PlaylistModel,
    Playlists, RemoveTrackFromPlaylistAction
} from "../../../types/models";
import {
    ADD_TRACKS_IN_PLAYLIST,
    CREATE_PLAYLIST,
    FETCH_ALL_PLAYLIST, REMOVE_TRACKS_FROM_PLAYLIST,
    SET_SELECTED_PLAYLIST
} from "./playlistActions";

const initialState: Playlists = {
    playlists: [],
    activePlaylist: {playlistId: "", playlist: defaultPlaylist}
}

export const playlistReducer: Reducer<Playlists, PlaylistAction> = function (state = initialState, action): Playlists {
    switch (action.type) {
        case FETCH_ALL_PLAYLIST: {
            return {
                ...state,
                playlists: action.playlists
            }
        }
        case CREATE_PLAYLIST: {
            return {
                ...state,
                playlists: state.playlists.concat(action.playlist)
            }
        }
        case ADD_TRACKS_IN_PLAYLIST: {
            let allPlaylists = Array.from(state.playlists);
            return {
                ...state,
                playlists: addTracks(allPlaylists, action)
            }
        }
        case SET_SELECTED_PLAYLIST: {
            return {
                ...state,
                activePlaylist: {
                    playlist: action.playlist,
                    playlistId: action.playlist.id
                },

            }
        }
        case REMOVE_TRACKS_FROM_PLAYLIST: {
            let allPlaylists = Array.from(state.playlists);
            return {
                ...state,
                playlists: removeTrack(allPlaylists, action)
            }
        }
    }

    return state;
}

function getPlaylistInfo(allPlaylists: PlaylistModel[], id: string): number {
    return allPlaylists.findIndex((p) => p.id === id);
}

function addTracks(allPlaylists: PlaylistModel[], action: AddTracksToPlaylistAction): PlaylistModel[] {

    let playlistToBeUpdatedIndex = getPlaylistInfo(allPlaylists, action.playlist.id);
    if (playlistToBeUpdatedIndex > -1) {
        let playlistToBeUpdated = action.playlist;
        playlistToBeUpdated.tracks = action.tracks;
        allPlaylists.splice(playlistToBeUpdatedIndex, 1, playlistToBeUpdated);
    }
    return allPlaylists;
}

function removeTrack(allPlaylists: PlaylistModel[], action: RemoveTrackFromPlaylistAction): PlaylistModel[] {
    let playlistToBeUpdatedIndex = getPlaylistInfo(allPlaylists, action.playlist.id);
    if (playlistToBeUpdatedIndex > -1) {
        let playlistToBeUpdated = action.playlist;
        playlistToBeUpdated.tracks = playlistToBeUpdated.tracks.filter((track) => {
            return track.id !== action.track.id;
        });
        allPlaylists.splice(playlistToBeUpdatedIndex, 1, playlistToBeUpdated);
    }
    return allPlaylists;
}
