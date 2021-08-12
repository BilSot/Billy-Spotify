import React from "react";
import {SearchResult} from "../types/models";

interface SearchResultsListProps {
    searchResults: SearchResult[],
    addTrackToPlaylist: (trackUri: string) => void
}
const SearchResultsList: React.FC<SearchResultsListProps> = ({searchResults, addTrackToPlaylist}) => {

    return (
        <div>
            <ul>
            {searchResults.map((track) => {
                return <li key={track.id}>
                    <img src={track.image} alt="track's image" />
                    <span>{track.name}</span>
                    {track.addedInPlaylist && <span>Added</span>}
                    {!track.addedInPlaylist && <button onClick={() => addTrackToPlaylist(track.uri)}>Add track</button>}
                </li>
            })}
            </ul>
        </div>
    )
}
export default SearchResultsList;
