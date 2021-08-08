import {ErrorAction, ErrorResponse} from "../../../types/models";

export const SET_ERROR = "SET_ERROR";
export const RESET_ERROR = "RESET_ERROR";

export function setError(error: ErrorResponse): ErrorAction{
    return {
        type: SET_ERROR,
        error: error
    }
}

export function resetError(): ErrorAction{
    return {
        type: RESET_ERROR,
        error: {
            message: "",
            status: ""
        }
    }
}
