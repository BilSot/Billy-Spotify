import {call, takeLatest, put} from "redux-saga/effects";
import axios from "axios";
import {PlaylistModel, RetrieveAllPlaylists, TrackModel, UserDetailsModel} from "../types/models";
import {
    FETCH_ALL_PLAYLIST, fetchAllPlaylistsSuccess, fetchAllPlaylistsError, setSelectedPlaylist, setTracksInPlaylist
} from "../redux/reducers/playlistReducer/playlistActions";
import {fetchTracksFromPlaylist} from "./trackSaga";
import {setTracks} from "../redux/reducers/trackReducer/trackActions";

export function* playlistWatcherSaga() {
    yield takeLatest(FETCH_ALL_PLAYLIST, workerSaga);
}

function* workerSaga(action: RetrieveAllPlaylists): Generator<any, void, any> {
    try{
        const response = yield call(() => fetchPlaylists(action.token));
        let playlists: PlaylistModel[] = [];
        for (let item in response.data.items) {
            playlists.push({
                ...response.data.items[item],
                tracks: []
            });
        }
        yield put(fetchAllPlaylistsSuccess(playlists));
        yield put(setSelectedPlaylist(playlists[0]));
        yield call (() => getTracksFromPlaylist(action.token, playlists[0]));
    }catch (error){
        yield put(fetchAllPlaylistsError());
    }
}

function* getTracksFromPlaylist(token: string, playlist: PlaylistModel): Generator<any, void, any> {
    try{
        const response = yield call(() => fetchTracksFromPlaylist(token, playlist.id));
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
        yield put(setTracksInPlaylist(tracksInPlaylist, playlist));
        yield put(setTracks(tracksInPlaylist));
    }
    catch (error) {
        yield put(setTracksInPlaylist([], playlist));
    }
}

function fetchPlaylists(token: string): Promise<UserDetailsModel> {
    return axios.get("https://api.spotify.com/v1/me/playlists", {
        headers: {'Authorization': 'Bearer ' + token}
    })
}

/*function fetchTracksFromPlaylist(token: string, playlistId: string): Promise<TrackModel[]> {
    return axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        headers: {'Authorization': 'Bearer ' + token}
    })
}*/
