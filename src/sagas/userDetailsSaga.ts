import {call, takeLatest, put} from "redux-saga/effects";
import axios from "axios";
import {RetrieveUser, UserDetailsModel} from "../types/models";
import {
    FETCH_USER_REQUEST, fetchUserError, fetchUserSuccess
} from "../redux/reducers/userDetailsReducer/userDetailsActions";

export function* userWatcherSaga() {
    yield takeLatest(FETCH_USER_REQUEST, workerSaga);
}

function* workerSaga(action: RetrieveUser): Generator<any, void, any> {
    try{
        const response = yield call(() => fetchUser(action.token));
        let user: UserDetailsModel = {
            id: response.data.id,
            display_name: response.data.display_name,
            image: response.data.images[0].url,
            loaded: true
        };
        yield put(fetchUserSuccess(user));
    }catch (error){
        yield put(fetchUserError());
    }
}

function fetchUser(token: string): Promise<UserDetailsModel> {
    return axios.get("https://api.spotify.com/v1/me", {
        headers: {'Authorization': 'Bearer ' + token}
    })
}
