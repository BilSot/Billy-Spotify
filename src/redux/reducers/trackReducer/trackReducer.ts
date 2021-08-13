import {Reducer} from "redux";
import {TrackAction, TrackListModel} from "../../../types/models";
import {ADD_TRACK, FETCH_ALL_TRACKS, REMOVE_TRACK} from "./trackActions";

const initialState: TrackListModel = {
    tracks: []
}

export const trackReducer: Reducer<TrackListModel, TrackAction> = (state: TrackListModel = initialState, action: TrackAction): TrackListModel => {
    switch (action.type){
        case FETCH_ALL_TRACKS: {
            return {
                ...state,
                tracks: action.tracks
            }
        }
        case ADD_TRACK: {
            return {
                ...state,
                tracks: state.tracks.concat(action.track)
            }
        }
        case REMOVE_TRACK: {
            return {
                ...state,
                tracks: state.tracks.filter((t) => t.id !== action.track.id)
            }
        }
    }

    return state;
}
