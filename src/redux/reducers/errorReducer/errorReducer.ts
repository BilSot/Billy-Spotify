import {Reducer} from "redux";
import {ErrorAction, ErrorState} from "../../../types/models";
import {SET_ERROR, RESET_ERROR} from "./errorActions";

const initialState: ErrorState = {
    errorResponse: {
        message: "",
        status: ""
    }
};

export const errorReducer: Reducer<ErrorState, ErrorAction> = function (state: ErrorState = initialState, action: ErrorAction): ErrorState {
    switch(action.type) {
        case SET_ERROR:
        case RESET_ERROR: {
            return {
                ...state,
                errorResponse: action.error
            }
        }
    }

    return state;
}
