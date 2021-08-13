import React, {useEffect, useState} from "react";
import Track from "./Track";
import {TrackModel} from "../types/models";

interface TrackListProps {
    tracks: TrackModel[],
    removeTrack: (track: TrackModel) => void
}

const TrackList: React.FC<TrackListProps> = ({tracks, removeTrack}) => {

    return (
        <div>
            {tracks && tracks.map((track) => {
                return <Track key={track.id} track={track} removeTrack={removeTrack}/>
            })}
        </div>
    )
}

export default TrackList;
