import React from "react";
import {TrackModel} from "../types/models";

interface TrackProps {
    track: TrackModel
}
const Track: React.FC<TrackProps> = ({track}) => {
    return (
        <div>
            <p>{track.name}</p>
            <p>{track.album}</p>
            <img src={track.image} />
        </div>
    )
}

export default Track;
