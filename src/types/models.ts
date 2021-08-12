import {Action} from "redux";
import {FETCH_ALL_PLAYLIST} from "../redux/reducers/playlistReducer/playlistActions";

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

export interface Playlists {
    playlists: PlaylistModel[];
    activePlaylist: string;
}

export interface PlaylistModel {
    name: string;
    id: string;
    description: string;
    image?: string;
    tracks: TrackModel[];
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
export type UserAction = {type: string; user: UserDetailsModel};

export interface SetActivePlaylistAction extends Action<"SET_SELECTED_PLAYLIST"> {playlistId: string};
export interface RetrieveAllPlaylistsAction extends Action<"FETCH_ALL_PLAYLIST"> {playlists: PlaylistModel[]};
export interface CreatePlaylistAction extends Action<"CREATE_PLAYLIST"> {playlist: PlaylistModel};
export interface AddTracksAction extends Action<"ADD_TRACKS"> {tracks: TrackModel[], playlistId: string};
export type PlaylistAction = RetrieveAllPlaylistsAction | CreatePlaylistAction | SetActivePlaylistAction | AddTracksAction;

export interface RetrieveTrackListAction extends Action<"FETCH_ALL_TRACKS"> {tracks: TrackModel[]};
export type TrackAction = RetrieveTrackListAction;
