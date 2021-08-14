import React, {FormEvent, FormEventHandler, useState} from "react";
import {Button, Modal, Form} from "react-bootstrap";
import {DraftPlaylist} from "../../types/models";
import "./AddPlaylist.css";

interface AddPlaylistProps {
    createNewPlaylist: (playlist: DraftPlaylist) => void
}
const AddPlaylist: React.FC<AddPlaylistProps> = ({createNewPlaylist}) => {
    const [show, setShow] = useState(false);
    const [playlist, setPlaylist] = useState<DraftPlaylist>({name: "", description: ""});
    const [validated, setValidated] = useState(false);
    const [errors, setErrors] = useState<{[key:string]: any}>({});
    const [form, setForm] = useState<{[key:string]: string}>({});

    const setField = (field: string, value: string) => {
        setForm({
            ...form,
            [field]: value
        });
        if ( errors[field] ) setErrors({
            ...errors,
            [field]: null
        })
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formErrors = findFormErrors();

        if(Object.keys(formErrors).length > 0){
            setErrors(formErrors);
        }else{
            createNewPlaylist(playlist);
            setPlaylist({name: "", description: ""});
            setValidated(true);
            setShow(false);
        }
    };

    const findFormErrors = () => {
        const { name } = form;
        const newErrors: {[key:string]: string} = {};
        // name errors
        if ( !name || name === '' ) newErrors.name = 'Please enter a name'

        return newErrors;
    };

    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false);
        setPlaylist({name: "", description: ""});
        for (let error in errors){
            setErrors({});
        }
    }
    return (
        <div className="add-playlist col-3">
            <Button onClick={handleShow} className="add-playlist-btn">Create new playlist</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create new playlist</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate onSubmit={handleSubmit}>
                        <Form.Group className="m-0">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                required
                                className="textFeedback"
                                placeholder="Name"
                                value={playlist.name}
                                isInvalid={!!errors.name}
                                onChange={e => {
                                    setField("name", e.target.value);
                                    setPlaylist({name: e.target.value, description: playlist.description})
                                }}
                                type="text"
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.name}
                            </Form.Control.Feedback>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                className="textFeedback"
                                placeholder="Description"
                                value={playlist.description}
                                onChange={e => {
                                    setField("description", e.target.value);
                                    setPlaylist({name: playlist.name, description: e.target.value})
                                }}
                                type="text"
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Save Changes
                        </Button>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer></Modal.Footer>
            </Modal>
        </div>
    )
}

export default AddPlaylist;
