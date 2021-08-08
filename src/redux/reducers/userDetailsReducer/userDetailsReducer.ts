import {Reducer} from "redux";
import {UserAction, UserDetailsState} from "../../../types/models";
import {FETCH_USER_ERROR, FETCH_USER_SUCCESS} from "./userDetailsActions";

const initialState: UserDetailsState = {
    id: "",
    display_name: "",
    image: "",
    loaded: false
}

export const userDetailsReducer: Reducer<UserDetailsState, UserAction> = function (state: UserDetailsState = initialState, action: UserAction): UserDetailsState {
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
