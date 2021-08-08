import React from "react";
import TrackList from "./TrackList";

const PlaylistDropdown = () => {
    return (
        <div>
            <select>
                <option>1</option>
                <option>2</option>
                <option>3</option>
            </select>
            <TrackList />
        </div>
    )
}

export default PlaylistDropdown;
