import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import SaveBook from './SaveBook';

function SaveModal({ show, setShow, getBooks, book, setBook, setEmptyBook }) {

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);

        //book empty set
        setEmptyBook();
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Save Book
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Save Book</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <SaveBook setShow={setShow} getBooks={getBooks} book={book} setBook={setBook} />

                    <Button variant="secondary" style={{ width: '100%' }} onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Body>
                {/* <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer> */}
            </Modal>
        </>
    );
}

export default SaveModal;