import React, {ChangeEvent, useState} from "react";
import {Timer} from "../../types/timer";
import axios from "axios";
import {BillySpotifyStateModel, PlaylistModel, SearchResult, TrackModel} from "../../types/models";
import {connect, ConnectedProps} from "react-redux";
import SearchResultsList from "../SearchResults/SearchResultsList";
import {bindActionCreators} from "redux";
import {setTracksInPlaylist} from "../../redux/reducers/playlistReducer/playlistActions";
import {addTrack, setTracks} from "../../redux/reducers/trackReducer/trackActions";
import "./Search.css";

interface SearchProps {

}

const Search: React.FC<SearchPropsFromRedux> = ({
                                                    token,
                                                    selectedPlaylist,
                                                    addTrack,
                                                    setTracksInPlaylist
                                                }) => {
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const timer = new Timer(500, false, searchForTracks);
    const handleOnChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
        timer.Stop();
        if (event.target.value.length > 0) {
            timer.Start(event.target.value);
        } else {
            setSearchResults([]);
        }
    }

    function searchForTracks(keyword: string): void {
        axios.get(`https://api.spotify.com/v1/search?q=${keyword}&type=track`, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }
        )
            .then((data) => {
                let tracks = data.data.tracks.items;
                let searchResults: SearchResult[] = [];
                for (let item in tracks) {
                    searchResults.push({
                        id: tracks[item].id,
                        name: tracks[item].name,
                        image: tracks[item].album.images[2].url,
                        artists: tracks[item].artists,
                        uri: tracks[item].uri,
                        addedInPlaylist: false
                    });
                }
                searchResults = checkIfResultsInSelectedPlaylist(searchResults);
                setSearchResults(searchResults);
            })
            .catch((error) => console.log("error while searching::" + error));
    }

    function checkIfResultsInSelectedPlaylist(searchResults: SearchResult[]): SearchResult[] {

        for (let i = 0; i < selectedPlaylist.playlist.tracks.length; i++) {
            for (let j = 0; j < searchResults.length; j++) {
                if (selectedPlaylist.playlist.tracks[i].uri === searchResults[j].uri) {
                    searchResults[j].addedInPlaylist = true;
                }
            }
        }
        return searchResults;
    }

    const addTrackToPlaylist = (track: SearchResult): void => {
        axios.post(`https://api.spotify.com/v1/playlists/${selectedPlaylist.playlistId}/tracks`, {"uris": [track.uri]}, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }
            }
        )
            .then((response) => {
                if (response.status === 201) {
                    fetchTrackInfo(track)
                        .then((newTrack) => {
                            let playlistTracks: TrackModel[] = Array.from(selectedPlaylist.playlist.tracks);
                            playlistTracks.push(newTrack);
                            setTracksInPlaylist(playlistTracks, selectedPlaylist.playlist);
                            addTrack(newTrack);
                        })
                        .catch((error) => console.error(error));
                }
            })
            .catch((error) => console.log(error));
    }

    const fetchTrackInfo = (track: SearchResult): Promise<TrackModel> => {
        return axios.get(`https://api.spotify.com/v1/tracks/${track.id}`, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then((response) => {
                console.log("We have our song! ", response.data);
                let track: TrackModel = {
                    id: response.data.id,
                    name: response.data.name,
                    image: response.data.album.images[2].url,
                    artists: response.data.artists,
                    album: response.data.album.name,
                    duration: response.data.duration_ms,
                    uri: response.data.uri
                };
                return track;
            })
            .catch((error) => {
                return Promise.resolve(error);
            })
    }

    return (

        <div className="search-container col-12">
            <div className="search-container-overlay">
                <div className="search-input">
                    <input placeholder="Search for tracks..." onChange={handleOnChangeInput}/>
                </div>
                <SearchResultsList searchResults={searchResults} addTrackToPlaylist={addTrackToPlaylist}/>
            </div>
        </div>
    )
}

const mapStateToProps = (state: BillySpotifyStateModel, ownProps: SearchProps) => {
    return {
        ...ownProps,
        token: state.tokenState.token,
        selectedPlaylist: state.playlistsData.activePlaylist,
        playlists: state.playlistsData.playlists
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        setTracksInPlaylist,
        setTracks,
        addTrack
    }, dispatch)
};

export type SearchPropsFromRedux = ConnectedProps<typeof connector>;
const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(Search);
