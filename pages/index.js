import Head from 'next/head'
import { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Modal from '../components/utils/Modal';
import { getTasks, addTask } from '../store/actions/main';

import Loading from '../components/utils/Loading';
import Task from '../components/Task';

import '../styles/index.module.css';

function Home(props) {
  const { loading, tasks } = props;

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [title, setTitle] = useState('');
  const handleTitleChange = (e) => setTitle(e.target.value);
  const [details, setDetails] = useState('');
  const handleDetailsChange = (e) => setDetails(e.target.value);
  const [date, setDate] = useState(new Date().toISOString());
  const handleDateChange = (e) => setDate(e.toISOString());
  const createTask = () => {
    props.addTask({
      title,
      details,
      due: date,
      isCompleted: false
    });
    handleClose();
  }

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
          <Modal
          show={show}
          handleShow={handleShow}
          title={title}
          handleTitleChange={handleTitleChange}
          details={details}
          handleDetailsChange={handleDetailsChange}
          date={date}
          handleDateChange={handleDateChange}
          handleClose={handleClose}
          submit={createTask}
          ></Modal>
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
  getTasks, addTask
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
