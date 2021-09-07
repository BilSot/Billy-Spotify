import React, {useState} from "react";
import {TrackModel} from "../../types/models";
import {Button, Modal} from "react-bootstrap";
import "./Track.css";

interface TrackProps {
    track: TrackModel,
    removeTrack: (track: TrackModel) => void
}

const Track: React.FC<TrackProps> = ({track, removeTrack}) => {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const confirmRemoveTrack = (track: TrackModel) => {
        removeTrack(track);
    }

    const durationInMinutes = (duration: number): string => {
        let minutes: number = Math.floor(duration / 60000);
        let seconds: number = ((duration % 60000) / 1000);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds.toFixed(0);
    }

    return (
        <>
            <tr>
                <td></td>
                <td><img src={track.image} alt="track"/></td>
                <td>{track.name}</td>
                <td>{track.artists.map((artist) => {
                    return <p key={artist.id}>{artist.name}</p>
                })
                }
                </td>
                <td>{track.album}</td>
                <td>{durationInMinutes(track.duration)}</td>
                <td>
                    <Button onClick={handleShow} className="remove-track-btn">Remove track</Button></td>
            </tr>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Remove track "{track.name}"</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to remove this track from your playlist?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="remove-track-btn remove-confirm" onClick={() => confirmRemoveTrack(track)}>
                        Remove
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Track;
