import {Reducer} from "redux";
import {UserAction, UserDetailsModel} from "../../../types/models";
import {FETCH_USER_ERROR, FETCH_USER_SUCCESS} from "./userDetailsActions";

const initialState: UserDetailsModel = {
    id: "",
    display_name: "",
    image: "",
    loaded: false
}

export const userDetailsReducer: Reducer<UserDetailsModel, UserAction> = function (state: UserDetailsModel = initialState, action: UserAction): UserDetailsModel {
    switch (action.type) {
        case FETCH_USER_SUCCESS:
        {
            return {
                ...state,
                id: action.user.id,
                display_name: action.user.display_name,
                image: action.user.image,
                loaded: true
            }
        }
        case FETCH_USER_ERROR:
        {
            return {
                ...state,
                loaded: false
            }
        }

    }
    return state;
}
