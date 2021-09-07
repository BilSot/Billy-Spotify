import {all} from "redux-saga/effects";
import {userWatcherSaga} from "./userDetailsSaga";
import {playlistWatcherSaga} from "./playlistsSaga";
import {trackWatcherSaga} from "./trackSaga";

export function* rootSaga() {
    yield all([userWatcherSaga(),
        playlistWatcherSaga(),
        trackWatcherSaga()])
}
