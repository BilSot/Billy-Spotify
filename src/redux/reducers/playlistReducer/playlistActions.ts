import {
    SetActivePlaylistAction,
    PlaylistModel,
    CreatePlaylistAction,
    RetrieveAllPlaylistsAction, AddTracksAction, TrackModel
} from "../../../types/models";

export const SET_SELECTED_PLAYLIST = "SET_SELECTED_PLAYLIST";
export const FETCH_PLAYLIST_ERROR = "FETCH_PLAYLIST_ERROR";
export const FETCH_ALL_PLAYLIST = "FETCH_ALL_PLAYLIST";
export const CREATE_PLAYLIST = "CREATE_PLAYLIST";
export const ADD_TRACKS = "ADD_TRACKS";

export const fetchAllPlaylists = (playlists: PlaylistModel[]): RetrieveAllPlaylistsAction => {
    return {
        type: FETCH_ALL_PLAYLIST,
        playlists: playlists
    }
}

export const setSelectedPlaylist = (playlistId: string): SetActivePlaylistAction => {
    return {
        type: SET_SELECTED_PLAYLIST,
        playlistId: playlistId
    }
}

export const createPlaylist = (playlist: PlaylistModel): CreatePlaylistAction => {
    return {
        type: CREATE_PLAYLIST,
        playlist: playlist
    }
}

export const setTracksInPlaylist = (tracks: TrackModel[], playlistId: string): AddTracksAction => {
    return {
        type: ADD_TRACKS,
        tracks: tracks,
        playlistId: playlistId
    }
}
