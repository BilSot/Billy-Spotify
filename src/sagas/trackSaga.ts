import {call, takeLatest, put} from "redux-saga/effects";
import axios from "axios";
import {FETCH_ALL_TRACKS, fetchTracksError, fetchTracksSuccess} from "../redux/reducers/trackReducer/trackActions";
import {RetrieveTracks, TrackModel} from "../types/models";

export function* trackWatcherSaga() {
    yield takeLatest(FETCH_ALL_TRACKS, workerSaga);
}

function* workerSaga(action: RetrieveTracks): Generator<any, void, any> {
    try{
        const response = yield call(() => fetchTracksFromPlaylist(action.token, action.playlistId));
        let tracksInPlaylist: TrackModel[] = [];
        for (let item in response.data.items) {
            tracksInPlaylist.push({
                id: response.data.items[item].track.id,
                name: response.data.items[item].track.name,
                uri: response.data.items[item].track.uri,
                album: response.data.items[item].track.album.name,
                artists: response.data.items[item].track.artists,
                image: response.data.items[item].track.album.images[2].url,
                duration: response.data.items[item].track.duration_ms
            });
        }
        yield put(fetchTracksSuccess(tracksInPlaylist));
    }
    catch (error) {
        yield put(fetchTracksError());
    }
}

export function fetchTracksFromPlaylist(token: string, playlistId: string): Promise<TrackModel[]> {
    return axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        headers: {'Authorization': 'Bearer ' + token}
    })
}
