import React, {ChangeEvent, useState} from "react";
import {Timer} from "../types/timer";
import axios from "axios";
import {BillySpotifyStateModel, PlaylistModel, SearchResult} from "../types/models";
import {connect, ConnectedProps} from "react-redux";
import SearchResultsList from "./SearchResultsList";
import {bindActionCreators} from "redux";
import {setTracksInPlaylist} from "../redux/reducers/playlistReducer/playlistActions";
import {setTracks} from "../redux/reducers/trackReducer/trackActions";

interface SearchProps {

}
const Search: React.FC<SearchPropsFromRedux> = ({token, playlists, selectedPlaylistIndex, setTracks, setTracksInPlaylist}) => {
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const timer = new Timer(500, false, searchForTracks);
    const handleOnChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
        timer.Stop();
        if (event.target.value.length > 0) {
            timer.Start(event.target.value);
        }else {
            setSearchResults([]);
        }
    }

    function searchForTracks (keyword: string): void {
        axios.get(`https://api.spotify.com/v1/search?q=${keyword}&type=track`,  {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }
        )
            .then((data) => {
                let tracks = data.data.tracks.items;
                let searchResults: SearchResult[] = [];
                for (let item in tracks){
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
                console.log();
            })
            .catch((error) => console.log("error while searching::" + error));
    }

    function checkIfResultsInSelectedPlaylist(searchResults: SearchResult[]): SearchResult[]{
        let activePlaylist: PlaylistModel | undefined = playlists.find((p) => p.id === selectedPlaylistIndex);
        if(activePlaylist){
            for (let i = 0; i < activePlaylist.tracks.length; i++) {
                for (let j = 0; j < searchResults.length; j++) {
                    if(activePlaylist.tracks[i].uri === searchResults[j].uri){
                        searchResults[j].addedInPlaylist = true;
                    }
                }
            }
        }
        return searchResults;
    }

    const addTrackToPlaylist = (trackUri: string): void => {
        axios.post(`https://api.spotify.com/v1/playlists/${selectedPlaylistIndex}/tracks`, {"uris": [trackUri]}, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }
            }
        )
            .then((response) => {
                /*if status === 201, fetch the track
                append it to the selectedPlaylist's tracks array
                trigger setTracksInPlaylist
                trigger setTracks
                */
                console.log(response);
            })
            .catch((error) => console.log(error));
    }

    return(
        <div>
            <input placeholder="Search for tracks..." onChange={handleOnChangeInput}/>
            <SearchResultsList searchResults={searchResults} addTrackToPlaylist={addTrackToPlaylist}/>
        </div>
    )
}

const mapStateToProps = (state: BillySpotifyStateModel, ownProps: SearchProps) => {
    return {
        ...ownProps,
        token: state.tokenState.token,
        selectedPlaylistIndex: state.playlistsData.activePlaylist,
        playlists: state.playlistsData.playlists
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        setTracksInPlaylist,
        setTracks
    }, dispatch)
};

export type SearchPropsFromRedux = ConnectedProps<typeof connector>;
const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(Search);
