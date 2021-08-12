import React from "react";
import Track from "./Track";
import {TrackModel} from "../types/models";

interface TrackListProps {
    tracks: TrackModel[]
}

const TrackList: React.FC<TrackListProps> = ({tracks}) => {
    return (
        <div>
            {tracks && tracks.map((track) => {
                return <Track key={track.id} track={track}/>
            })}
        </div>
    )
}

export default TrackList;
