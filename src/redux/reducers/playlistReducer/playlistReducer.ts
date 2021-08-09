import {Reducer} from "redux";
import {
    Playlists,
    RetrieveAllPlaylistsAction,
} from "../../../types/models";
import {FETCH_ALL_PLAYLIST} from "./playlistActions";

const initialState: Playlists = {
    playlists: []
}

export const playlistReducer: Reducer<Playlists, RetrieveAllPlaylistsAction> = function(state: Playlists = initialState, action: RetrieveAllPlaylistsAction): Playlists {
    switch (action.type) {
        case FETCH_ALL_PLAYLIST: {
            return {
                ...state,
                playlists: action.playlists
            }
        }
    }

    return state;
}
