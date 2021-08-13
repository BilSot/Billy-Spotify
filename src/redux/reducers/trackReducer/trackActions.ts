import {AddTrackAction, RemoveTrackAction, SetTracksAction, TrackModel} from "../../../types/models";

export const FETCH_ALL_TRACKS = "FETCH_ALL_TRACKS";
export const ADD_TRACK = "ADD_TRACK";
export const REMOVE_TRACK = "REMOVE_TRACK";

export const setTracks = (tracks: TrackModel[]): SetTracksAction => {
    return {
        type: FETCH_ALL_TRACKS,
        tracks: tracks
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
