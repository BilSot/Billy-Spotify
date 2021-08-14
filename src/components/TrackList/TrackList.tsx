import React, {useEffect, useState} from "react";
import Track from "../Track/Track";
import {TrackModel} from "../../types/models";
import "./TrackList.css";
import {Table} from "react-bootstrap";

interface TrackListProps {
    tracks: TrackModel[],
    removeTrack: (track: TrackModel) => void
}

const TrackList: React.FC<TrackListProps> = ({tracks, removeTrack}) => {

    return (
        <div>
            <Table striped bordered hover variant="dark">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Artist</th>
                    <th>Album</th>
                    <th>Duration</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                    {tracks && tracks.map((track) => {
                        return <Track key={track.id} track={track} removeTrack={removeTrack}/>
                    })}
                </tbody>
            </Table>
        </div>
    )
}

export default TrackList;
