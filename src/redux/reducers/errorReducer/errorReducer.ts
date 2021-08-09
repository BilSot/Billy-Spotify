import {Reducer} from "redux";
import {ErrorAction, ErrorModel} from "../../../types/models";
import {SET_ERROR, RESET_ERROR} from "./errorActions";

const initialState: ErrorModel = {
    errorResponse: {
        message: "",
        status: ""
    }
};

export const errorReducer: Reducer<ErrorModel, ErrorAction> = function (state: ErrorModel = initialState, action: ErrorAction): ErrorModel {
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
