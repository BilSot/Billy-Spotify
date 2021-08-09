import {combineReducers} from "redux";
import {tokenReducer} from "./reducers/tokenReducer/tokenReducer";
import {errorReducer} from "./reducers/errorReducer/errorReducer";
import {userDetailsReducer} from "./reducers/userDetailsReducer/userDetailsReducer";
import {playlistReducer} from "./reducers/playlistReducer/playlistReducer";
import {BillySpotifyStateModel} from "../types/models";
import {trackReducer} from "./reducers/trackReducer/trackReducer";

export const rootReducer = combineReducers<BillySpotifyStateModel>({
    tokenState: tokenReducer,
    errorState: errorReducer,
    user: userDetailsReducer,
    playlistsData: playlistReducer,
    trackList: trackReducer
})
