import {
    SetActivePlaylistAction,
    PlaylistModel,
    CreatePlaylistAction,
    AddTracksToPlaylist,
    TrackModel,
    PlaylistAction,
    RetrieveAllPlaylists,
    RemoveTracksFromPlaylist,
    RemoveTracksFromPlaylistSuccess,
    RemoveTracksFromPlaylistError, ActivePlaylist
} from "../../../types/models";

export const SET_SELECTED_PLAYLIST = "SET_SELECTED_PLAYLIST";
export const FETCH_ALL_PLAYLIST = "FETCH_ALL_PLAYLIST";
export const FETCH_ALL_PLAYLIST_SUCCESS = "FETCH_ALL_PLAYLIST_SUCCESS";
export const FETCH_ALL_PLAYLIST_ERROR = "FETCH_ALL_PLAYLIST_ERROR";
export const CREATE_PLAYLIST = "CREATE_PLAYLIST";
export const ADD_TRACKS_IN_PLAYLIST = "ADD_TRACKS_IN_PLAYLIST";
export const REMOVE_TRACKS_FROM_PLAYLIST = "REMOVE_TRACKS_FROM_PLAYLIST";
export const REMOVE_TRACKS_FROM_PLAYLIST_SUCCESS = "REMOVE_TRACKS_FROM_PLAYLIST_SUCCESS";
export const REMOVE_TRACKS_FROM_PLAYLIST_ERROR = "REMOVE_TRACKS_FROM_PLAYLIST_ERROR";

export const fetchAllPlaylists = (token: string): RetrieveAllPlaylists => {
    return {
        type: FETCH_ALL_PLAYLIST,
        token: token
    }
}

export const fetchAllPlaylistsSuccess = (playlists: PlaylistModel[]): PlaylistAction => {
    return {
        type: FETCH_ALL_PLAYLIST_SUCCESS,
        playlists: playlists
    }
}

export const fetchAllPlaylistsError = (): PlaylistAction => {
    return {
        type: FETCH_ALL_PLAYLIST_ERROR
    }
}

export const setSelectedPlaylist = (playlist: PlaylistModel): SetActivePlaylistAction => {
    return {
        type: SET_SELECTED_PLAYLIST,
        playlist: playlist
    }
}

export const createPlaylist = (playlist: PlaylistModel): CreatePlaylistAction => {
    return {
        type: CREATE_PLAYLIST,
        playlist: playlist
    }
}

export const addTracksInPlaylist = (tracks: TrackModel[], playlist: PlaylistModel): AddTracksToPlaylist => {
    return {
        type: ADD_TRACKS_IN_PLAYLIST,
        tracks: tracks,
        playlist: playlist
    }
}

export const removeTrackFromPlaylist = (token: string, track: TrackModel, playlist: ActivePlaylist): RemoveTracksFromPlaylist => {
    return {
        type: REMOVE_TRACKS_FROM_PLAYLIST,
        token: token,
        track: track,
        playlist: playlist
    }
}

export const removeTrackSuccess = (track: TrackModel, playlist: PlaylistModel): RemoveTracksFromPlaylistSuccess => {
    return {
        type: REMOVE_TRACKS_FROM_PLAYLIST_SUCCESS,
        track: track,
        playlist: playlist
    }
}

export const removeTrackError = (): RemoveTracksFromPlaylistError => {
    return {
        type: REMOVE_TRACKS_FROM_PLAYLIST_ERROR
    }
}
