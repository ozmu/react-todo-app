import { Modal, Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";

export default (props) => {
  const [currentList, setCurrentList] = useState(props.listId);

  return (
      <Modal show={props.show} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{props.mode == 'create' ? 'New Task' : 'Edit Task'}</Modal.Title>
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

              <Form.Group className="mb-3" controlId="formListId">
                <Form.Label>List</Form.Label>
                <Form.Control
                  as="select"
                  multiple={false}
                  value={props.listId ? props.listId : 'null'}
                  onChange={e => {
                    setCurrentList(e.target.value);
                  }}
                >
                  {props.lists.map((item, idx) => <option key={idx} value={item.id ? item.id : 'null'}>{item.title}</option>)}
                </Form.Control>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formDatetime">
                <Form.Label>Due Date</Form.Label>
                <Datetime value={props.date} onChange={props.handleDateChange}/>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.handleClose}>Close</Button>
            <Button variant="primary" onClick={props.submit}>{props.mode == 'create' ? 'Save' : 'Update'}</Button>
          </Modal.Footer>
        </Modal>
  )
}