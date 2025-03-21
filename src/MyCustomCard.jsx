import { useState } from "react";
import { Pen, Trash } from "react-bootstrap-icons";
import { Card, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";

export const MyCustomCard = ({ id, nev, faj, meret, tonev, kep }) => {
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({ nev, faj, meret, tonev });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        axios.put(`https://halak.onrender.com/api/halak/${id}`, formData)
            .then(() => {
                handleClose();
            })
            .catch((error) => {
                console.error("Error updating data:", error);
            });
    };

    return (
        <>
            <Card width="18rem" margin="1rem">
                <Card.Img variant="top" src={`data:image/jpeg;base64,${kep}`} />
                <Card.Body>
                    <Card.Title>{nev}</Card.Title>
                    <Card.Text>
                        <ul>
                            <li>Faj: {faj}</li>
                            <li>Méret: {meret}</li>
                            <li>Tönev: {tonev}</li>
                        </ul>
                        <Button
                            variant="Danger"
                            onClick={() => {
                                if (window.confirm("Biztosan törölni szeretnéd?"))
                                    axios.delete(`https://halak.onrender.com/api/halak/${id}`)
                            }}>
                            <Trash />
                        </Button>
                        <Button variant="warning" onClick={handleShow}>
                            <Pen />
                        </Button>
                    </Card.Text>
                </Card.Body>
            </Card>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Card</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formNev">
                            <Form.Label>Név</Form.Label>
                            <Form.Control
                                type="text"
                                name="nev"
                                value={formData.nev}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formFaj">
                            <Form.Label>Faj</Form.Label>
                            <Form.Control
                                type="text"
                                name="faj"
                                value={formData.faj}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formMeret">
                            <Form.Label>Méret</Form.Label>
                            <Form.Control
                                type="text"
                                name="meret"
                                value={formData.meret}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formTonev">
                            <Form.Label>Tönev</Form.Label>
                            <Form.Control
                                type="text"
                                name="tonev"
                                value={formData.tonev}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
