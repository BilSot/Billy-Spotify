import {call, takeLatest, put, all} from "redux-saga/effects";
import axios from "axios";
import {
    PlaylistModel, RemoveTracksFromPlaylist,
    RetrieveAllPlaylists,
    TrackModel,
    UserDetailsModel
} from "../types/models";
import {
    FETCH_ALL_PLAYLIST,
    fetchAllPlaylistsSuccess,
    fetchAllPlaylistsError,
    setSelectedPlaylist,
    addTracksInPlaylist,
    REMOVE_TRACKS_FROM_PLAYLIST, removeTrackSuccess, removeTrackError
} from "../redux/reducers/playlistReducer/playlistActions";
import {fetchTracksFromPlaylist} from "./trackSaga";
import {removeTrack, setTracks} from "../redux/reducers/trackReducer/trackActions";

export function* playlistWatcherSaga() {
    yield all([
        takeLatest(FETCH_ALL_PLAYLIST, getPlaylists),
        takeLatest(REMOVE_TRACKS_FROM_PLAYLIST, deleteTracksFromPlaylist)
    ]);
}

function* getPlaylists(action: RetrieveAllPlaylists): Generator<any, void, any> {
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
        yield put(addTracksInPlaylist(tracksInPlaylist, playlist));
        yield put(setTracks(tracksInPlaylist));
    }
    catch (error) {
        yield put(addTracksInPlaylist([], playlist));
    }
}

function* deleteTracksFromPlaylist(action: RemoveTracksFromPlaylist): Generator<any, void, any> {
    try{
        const response = yield call(() => deleteTracks(action.token, action.track, action.playlist.playlist));
        if (response.status === 200) {
            yield put(removeTrackSuccess(action.track, action.playlist.playlist));
            yield put(removeTrack(action.track));
        }
    }
    catch(error){
        yield put(removeTrackError());
    }
}

function fetchPlaylists(token: string): Promise<UserDetailsModel> {
    return axios.get("https://api.spotify.com/v1/me/playlists", {
        headers: {'Authorization': 'Bearer ' + token}
    })
}

function deleteTracks(token: string, track: TrackModel, activePlaylist: PlaylistModel) {
    return axios.delete(`https://api.spotify.com/v1/playlists/${activePlaylist.id}/tracks`, {
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        data: {
            "tracks": [{"uri": track.uri}]
        }
    })
}
