import {
    RetrievePlaylistAction,
    PlaylistModel,
    DraftPlaylist,
    CreatePlaylistAction,
    RetrieveAllPlaylistsAction
} from "../../../types/models";

export const FETCH_PLAYLIST_SUCCESS = "FETCH_PLAYLIST_SUCCESS";
export const FETCH_PLAYLIST_ERROR = "FETCH_PLAYLIST_ERROR";
export const FETCH_ALL_PLAYLIST = "FETCH_ALL_PLAYLIST";
export const CREATE_PLAYLIST = "CREATE_PLAYLIST";

export const fetchAllPlaylists = (playlists: PlaylistModel[]): RetrieveAllPlaylistsAction => {
    return {
        type: FETCH_ALL_PLAYLIST,
        playlists: playlists
    }
}

export const fetchPlaylist = (playlist: PlaylistModel): RetrievePlaylistAction => {
    return {
        type: FETCH_PLAYLIST_SUCCESS,
        playlist: playlist
    }
}

export const createPlaylist = (playlist: DraftPlaylist): CreatePlaylistAction => {
    return {
        type: CREATE_PLAYLIST,
        playlist: playlist
    }
}
