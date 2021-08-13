import React, {useState} from "react";
import {SearchResult, TrackModel} from "../types/models";

interface SearchResultsListProps {
    searchResults: SearchResult[],
    addTrackToPlaylist: (track: SearchResult) => void
}
const SearchResultsList: React.FC<SearchResultsListProps> = ({searchResults, addTrackToPlaylist}) => {
    const [updateUI, triggerUpdate] = useState(false);
    const onTrackAddedClick = (track: SearchResult): void => {
        track.addedInPlaylist = true;
        triggerUpdate(!updateUI);
        addTrackToPlaylist(track);
    }
    return (
        <div>
            <ul>
            {searchResults.map((track) => {
                return <li key={track.id}>
                    <img src={track.image} alt="track's image" />
                    <span>{track.name}</span>
                    {track.addedInPlaylist && <span>Added</span>}
                    {!track.addedInPlaylist && <button onClick={() => onTrackAddedClick(track)}>Add track</button>}
                </li>
            })}
            </ul>
        </div>
    )
}
export default SearchResultsList;
