import {Reducer} from "redux";
import {RetrieveTrackListAction, TrackListModel, TrackModel} from "../../../types/models";
import {FETCH_ALL_TRACKS} from "./trackActions";

const initialState: TrackListModel = {
    tracks: []
}

export const trackReducer: Reducer<TrackListModel, RetrieveTrackListAction> = (state: TrackListModel = initialState, action: RetrieveTrackListAction): TrackListModel => {
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
