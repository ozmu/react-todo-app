import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Modal from '../components/utils/Modal';
import Loading from '../components/utils/Loading';
import Task from '../components/Task';
import { getTasks, addTask } from '../store/actions/main';

const Tasks = (props) => {
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
        <>
            <div className="container">
                içerik
            </div>
        </>
  )
}


const mapStateToProps = state => ({
    tasks: state.main.tasks,
    loading: state.main.loading
})

const mapDispatchToProps = {
    getTasks, addTask
}

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);