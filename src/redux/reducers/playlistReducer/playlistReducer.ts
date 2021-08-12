import {Reducer} from "redux";
import {
    PlaylistAction, PlaylistModel,
    Playlists
} from "../../../types/models";
import {ADD_TRACKS, CREATE_PLAYLIST, FETCH_ALL_PLAYLIST, SET_SELECTED_PLAYLIST} from "./playlistActions";

const initialState: Playlists = {
    playlists: [],
    activePlaylist: ""
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
        case ADD_TRACKS: {
            let playlistToBeUpdatedIndex: number = state.playlists.findIndex((p) => p.id === action.playlistId);
            let playlistToBeUpdated: PlaylistModel | undefined = state.playlists.find((p) => p.id === action.playlistId);
            if (playlistToBeUpdatedIndex > -1 && playlistToBeUpdated) {
                playlistToBeUpdated.tracks = action.tracks;
                state.playlists.splice(playlistToBeUpdatedIndex, 1, playlistToBeUpdated);
                return {
                    ...state,
                }
            }else{
                return {
                    ...state
                }
            }
        }
        case SET_SELECTED_PLAYLIST: {
            return {
                ...state,
                activePlaylist: action.playlistId
            }
        }
    }

    return state;
}
