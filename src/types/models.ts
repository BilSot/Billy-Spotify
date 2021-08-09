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
}

export interface PlaylistModel {
    name: string;
    id: string;
    description: string;
    image: string;
}

export interface TrackListModel {
    tracks: TrackModel[];
}

export interface TrackModel {
    id: string;
    name: string;
    artist: ArtistModel[];
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

export type TokenAction = {type: string; tokenValue: string};
export type ErrorAction = {type: string; error: ErrorResponse};
export type UserAction = {type: string; user: UserDetailsModel};
export type RetrievePlaylistAction = {type: string; playlist: PlaylistModel}
export type RetrieveAllPlaylistsAction = {type: string; playlists: PlaylistModel[]}
export type CreatePlaylistAction = {type: string; playlist: DraftPlaylist}
export type RetrieveTrackListAction = {type: string; tracks: TrackModel[]}
