import React, {useState} from "react";
import {SearchResult, TrackModel} from "../../types/models";
import "./SearchResults.css";
import {Button, ListGroup} from "react-bootstrap";

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
        <div className="search-results-list">
            {/*<ul>*/}
            <ListGroup variant="flush" className="list-group">
                {searchResults.map((track) => {
                    return <ListGroup.Item key={track.id} className="list-group-item">
                        <div className="list-group-item-content">
                            <div className="list-group-item-img">
                                <img src={track.image} alt="track's image"/>
                            </div>
                            <div className="list-group-item-name">
                                <span>{track.name}</span>
                            </div>
                            <div className="list-group-item-added">
                                {track.addedInPlaylist && <span>Added</span>}
                                {!track.addedInPlaylist &&
                                <Button onClick={() => onTrackAddedClick(track)}>Add track</Button>}</div>
                        </div>
                    </ListGroup.Item>
                })}
            </ListGroup>
            {/*</ul>*/}
        </div>
    )
}
export default SearchResultsList;
