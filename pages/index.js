import Head from 'next/head'
import { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


import { getTasks } from '../store/actions/main';

import Loading from '../components/utils/Loading';
import Task from '../components/Task';

import '../styles/index.module.css';

function Home(props) {
  const { loading, tasks } = props;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    props.getTasks();
  }, []);

  return (
    <div className="container">
      <Head>
        <title>Awesome Todo App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          Awesome Todo App
        </h1>

        <div className="new">
          <Button variant="primary" onClick={handleShow}>New</Button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>New Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Task title</Form.Label>
                  <Form.Control type="text" placeholder="Enter task title"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Details</Form.Label>
                  <Form.Control as="textarea" rows={3} placeholder="Details"/>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>Close</Button>
              <Button variant="primary">Save</Button>
            </Modal.Footer>
          </Modal>
        </div>

        <div className="grid">
          {loading ? <Loading /> : tasks.map((task, idx) => <Task key={idx} task={task}/>)}
        </div>
      </main>
    </div>
  )
}


const mapStateToProps = state => ({
  tasks: state.main.tasks,
  loading: state.main.loading
})

const mapDispatchToProps = {
  getTasks
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
