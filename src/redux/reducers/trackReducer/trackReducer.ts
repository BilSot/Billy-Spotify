import {Reducer} from "redux";
import {TrackAction, TrackListModel} from "../../../types/models";
import {ADD_TRACK, FETCH_ALL_TRACKS_ERROR, FETCH_ALL_TRACKS_SUCCESS, REMOVE_TRACK, SET_TRACKS} from "./trackActions";

const initialState: TrackListModel = {
    tracks: []
}

export const trackReducer: Reducer<TrackListModel, TrackAction> = (state: TrackListModel = initialState, action: TrackAction): TrackListModel => {
    switch (action.type){
        case FETCH_ALL_TRACKS_SUCCESS:
        case SET_TRACKS: {
            return {
                ...state,
                tracks: action.tracks
            }
        }
        case FETCH_ALL_TRACKS_ERROR: {
            return {
                ...state,
                tracks: []
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
