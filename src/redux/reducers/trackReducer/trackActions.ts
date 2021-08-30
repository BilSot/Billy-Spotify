import {
    AddTrackAction, FetchTracksError,
    FetchTracksSuccess,
    RemoveTrackAction,
    RetrieveTracks, SetTracks,
    TrackModel
} from "../../../types/models";

export const SET_TRACKS = "SET_TRACKS";
export const FETCH_ALL_TRACKS = "FETCH_ALL_TRACKS";
export const FETCH_ALL_TRACKS_SUCCESS = "FETCH_ALL_TRACKS_SUCCESS";
export const FETCH_ALL_TRACKS_ERROR = "FETCH_ALL_TRACKS_ERROR";
export const ADD_TRACK = "ADD_TRACK";
export const REMOVE_TRACK = "REMOVE_TRACK";

export const setTracks = (tracks: TrackModel[]): SetTracks => {
    return {
        type: SET_TRACKS,
        tracks
    }
}

export const fetchTracks = (token: string, playlistId: string): RetrieveTracks => {
    return {
        type: FETCH_ALL_TRACKS,
        token,
        playlistId
    }
}

export const fetchTracksSuccess = (tracks: TrackModel[]): FetchTracksSuccess => {
    return {
        type: FETCH_ALL_TRACKS_SUCCESS,
        tracks: tracks
    }
}

export const fetchTracksError = (): FetchTracksError => {
    return {
        type: FETCH_ALL_TRACKS_ERROR
    }
}
export const addTrack = (track: TrackModel): AddTrackAction => {
    return {
        type: ADD_TRACK,
        track: track
    }
}

export const removeTrack = (track: TrackModel): RemoveTrackAction => {
    return {
        type: REMOVE_TRACK,
        track: track
    }
}
