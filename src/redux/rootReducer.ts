import {combineReducers} from "redux";
import {tokenReducer} from "./reducers/tokenReducer/tokenReducer";
import {errorReducer} from "./reducers/errorReducer/errorReducer";
import {SpotlifyState} from "../types/models";
import {userDetailsReducer} from "./reducers/userDetailsReducer/userDetailsReducer";

export const rootReducer = combineReducers<SpotlifyState>({
    tokenState: tokenReducer,
    errorState: errorReducer,
    user: userDetailsReducer
})
