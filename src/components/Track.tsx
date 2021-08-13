import React, {useState} from "react";
import {TrackModel} from "../types/models";
import {Button, Modal} from "react-bootstrap";

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
    return (
        <div>
            <p>{track.name}</p>
            <p>{track.album}</p>
            <img src={track.image} />
            <Button onClick={handleShow}>Remove track</Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Remove track {track.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to remove this track from your playlist?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => confirmRemoveTrack(track)}>
                        Yes
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Track;
