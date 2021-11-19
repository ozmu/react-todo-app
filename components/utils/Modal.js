import { Modal, Button, Form } from 'react-bootstrap';
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";

export default (props) => {
    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>New Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Task title</Form.Label>
                  <Form.Control type="text" value={props.title} onChange={props.handleTitleChange} placeholder="Enter task title"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Details</Form.Label>
                  <Form.Control as="textarea" value={props.details} onChange={props.handleDetailsChange} rows={3} placeholder="Details"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formDatetime">
                  <Form.Label>Due Date</Form.Label>
                  <Datetime value={props.date} onChange={props.handleDateChange}/>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={props.handleClose}>Close</Button>
              <Button variant="primary" onClick={props.submit}>Save</Button>
            </Modal.Footer>
          </Modal>
    )
}