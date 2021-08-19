import{all} from "redux-saga/effects";
import {userWatcherSaga} from "./userDetailsSaga";

export function* rootSaga() {
    yield all([userWatcherSaga()])
}
