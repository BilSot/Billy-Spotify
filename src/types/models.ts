import {Action} from "redux";

export type HashParam = {[key: string]: string};

export interface BillySpotifyStateModel {
    tokenState: TokenModel;
    errorState: ErrorModel;
    user: UserDetailsModel;
    playlistsData: Playlists;
    trackList: TrackListModel;
}

export interface TokenModel {
    token: string;
}

export interface ErrorModel {
    errorResponse: ErrorResponse;
}

export type ErrorResponse = {
    message: string;
    status: string;
}

export interface UserDetailsModel {
    display_name: string;
    id: string;
    image: string;
    loaded: boolean;
}

export type ActivePlaylist = {playlistId: string, playlist: PlaylistModel}

export interface Playlists {
    playlists: PlaylistModel[];
    activePlaylist: ActivePlaylist;
}

export interface PlaylistModel {
    name: string;
    id: string;
    description: string;
    image?: string;
    tracks: TrackModel[];
}

export const defaultPlaylist: PlaylistModel = {
    name: "",
    id: "",
    description: "",
    tracks: []
}

export interface TrackListModel {
    tracks: TrackModel[];
}

export interface TrackModel {
    id: string;
    name: string;
    artists: ArtistModel[];
    album: string;
    image: string;
    duration: number;
    uri: string;
}

export interface ArtistModel {
    id: string;
    name: string;
}

export interface DraftPlaylist {
    name: string;
    description: string;
}

export interface SearchResult {
    id: string;
    name: string;
    image: string;
    artists: ArtistModel[];
    uri: string;
    addedInPlaylist: boolean;
}

export type TokenAction = {type: string; tokenValue: string};
export type ErrorAction = {type: string; error: ErrorResponse};

export interface RetrieveUser extends Action<"FETCH_USER_REQUEST"> {token: string}
export interface FetchUserSuccess extends Action<"FETCH_USER_SUCCESS"> {user: UserDetailsModel}
export interface FetchUserError extends Action<"FETCH_USER_ERROR"> {user: UserDetailsModel}
export type UserAction = RetrieveUser | FetchUserSuccess | FetchUserError;

export interface SetActivePlaylistAction extends Action<"SET_SELECTED_PLAYLIST"> {playlist: PlaylistModel};
export interface RetrieveAllPlaylistsAction extends Action<"FETCH_ALL_PLAYLIST"> {playlists: PlaylistModel[]};
export interface CreatePlaylistAction extends Action<"CREATE_PLAYLIST"> {playlist: PlaylistModel};
export interface AddTracksToPlaylistAction extends Action<"ADD_TRACKS_IN_PLAYLIST"> {tracks: TrackModel[], playlist: PlaylistModel};
export interface RemoveTrackFromPlaylistAction extends Action<"REMOVE_TRACKS_FROM_PLAYLIST"> {track: TrackModel, playlist: PlaylistModel};
export type PlaylistAction = RetrieveAllPlaylistsAction | CreatePlaylistAction | SetActivePlaylistAction | AddTracksToPlaylistAction | RemoveTrackFromPlaylistAction;

export interface SetTracksAction extends Action<"FETCH_ALL_TRACKS"> {tracks: TrackModel[]};
export interface AddTrackAction extends Action<"ADD_TRACK"> {track: TrackModel};
export interface RemoveTrackAction extends Action<"REMOVE_TRACK"> {track: TrackModel};
export type TrackAction = SetTracksAction | AddTrackAction | RemoveTrackAction;
