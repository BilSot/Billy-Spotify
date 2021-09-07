import {Reducer} from "redux";
import {
    AddTracksToPlaylist, defaultPlaylist,
    PlaylistAction, PlaylistModel,
    Playlists, RemoveTracksFromPlaylistSuccess
} from "../../../types/models";
import {
    ADD_TRACKS_IN_PLAYLIST,
    CREATE_PLAYLIST,
    FETCH_ALL_PLAYLIST_ERROR,
    FETCH_ALL_PLAYLIST_SUCCESS,
    REMOVE_TRACKS_FROM_PLAYLIST_SUCCESS,
    REMOVE_TRACKS_FROM_PLAYLIST_ERROR,
    SET_SELECTED_PLAYLIST
} from "./playlistActions";

const initialState: Playlists = {
    playlists: [],
    activePlaylist: {playlistId: "", playlist: defaultPlaylist}
}

export const playlistReducer: Reducer<Playlists, PlaylistAction> = function (state = initialState, action): Playlists {
    switch (action.type) {
        case FETCH_ALL_PLAYLIST_SUCCESS: {
            return {
                ...state,
                playlists: action.playlists
            }
        }
        case FETCH_ALL_PLAYLIST_ERROR: {
            return {
                ...state,
                playlists: []
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
        case REMOVE_TRACKS_FROM_PLAYLIST_SUCCESS: {
            let allPlaylists = Array.from(state.playlists);
            return {
                ...state,
                playlists: removeTrack(allPlaylists, action)
            }
        }
        case REMOVE_TRACKS_FROM_PLAYLIST_ERROR: {
            return {
                ...state
            }
        }
    }

    return state;
}

function getPlaylistInfo(allPlaylists: PlaylistModel[], id: string): number {
    return allPlaylists.findIndex((p) => p.id === id);
}

function addTracks(allPlaylists: PlaylistModel[], action: AddTracksToPlaylist): PlaylistModel[] {

    let playlistToBeUpdatedIndex = getPlaylistInfo(allPlaylists, action.playlist.id);
    if (playlistToBeUpdatedIndex > -1) {
        let playlistToBeUpdated = action.playlist;
        playlistToBeUpdated.tracks = action.tracks;
        allPlaylists.splice(playlistToBeUpdatedIndex, 1, playlistToBeUpdated);
    }
    return allPlaylists;
}

function removeTrack(allPlaylists: PlaylistModel[], action: RemoveTracksFromPlaylistSuccess): PlaylistModel[] {
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
