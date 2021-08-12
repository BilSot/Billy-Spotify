import {Reducer} from "redux";
import {TrackAction, TrackListModel} from "../../../types/models";
import {FETCH_ALL_TRACKS} from "./trackActions";

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
    }

    return state;
}
