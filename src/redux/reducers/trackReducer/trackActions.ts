import {RetrieveTrackListAction, TrackModel} from "../../../types/models";

export const FETCH_ALL_TRACKS = "FETCH_ALL_TRACKS";

export const setTracks = (tracks: TrackModel[]): RetrieveTrackListAction => {
    return {
        type: FETCH_ALL_TRACKS,
        tracks: tracks
    }
}
