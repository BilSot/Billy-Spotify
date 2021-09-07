import {RetrieveUser, UserAction, UserDetailsModel} from "../../../types/models";

export const FETCH_USER_REQUEST = "FETCH_USER_REQUEST";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const FETCH_USER_ERROR = "FETCH_USER_ERROR";

export const fetchUserRequest = (token: string): RetrieveUser => {
    return {
        type: FETCH_USER_REQUEST,
        token: token
    }
}

export const fetchUserSuccess = (user: UserDetailsModel): UserAction => {
    return {
        type: FETCH_USER_SUCCESS,
        user: user
    };
};

export const fetchUserError = (): UserAction => {
    return {
        type: FETCH_USER_ERROR,
        user: {id: "", display_name: "", image: "", loaded: false}
    };
};
