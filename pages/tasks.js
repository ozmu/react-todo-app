import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import Modal from '../components/utils/Modal';
import Loading from '../components/utils/Loading';
import Task from '../components/Task';
import { getListTasks, addTask } from '../store/actions/tasks';

const Tasks = (props) => {
  const router = useRouter();
  const listId = router.query.listId;

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
    if (listId != undefined){
      props.getListTasks(listId);
    }
  }, [listId]);

  return (
        <>
            <div className="container">
                {props.tasks.map((task, idx) => <Task key={idx} task={task}/>)}
            </div>
        </>
  )
}

const mapStateToProps = state => ({
    tasks: state.tasks.tasks
})

const mapDispatchToProps = {
    getListTasks, addTask
}

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);