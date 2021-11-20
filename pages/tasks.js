import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import TaskModal from '../components/utils/TaskModal';
import Loading from '../components/utils/Loading';
import Task from '../components/Task';
import { getListTasks, addTask } from '../store/actions/tasks';

const Tasks = (props) => {
  const router = useRouter();
  const listId = router.query.listId;

  const { tasks, loading } = props;

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const [title, setTitle] = useState('');
  const handleTitleChange = (e) => setTitle(e.target.value);

  const [details, setDetails] = useState('');
  const handleDetailsChange = (e) => setDetails(e.target.value);

  const [date, setDate] = useState(new Date().toISOString());
  const handleDateChange = (e) => setDate(e.toISOString());

  const createTask = () => {
    const t = {
      title,
      details,
      due: date,
      isCompleted: false
    }
    if (listId){
      t.listId = listId;
    }
    props.addTask(t);
    handleClose();
  }

  useEffect(() => {
    if (listId != undefined){
      props.getListTasks(listId);
    }
  }, [listId]);

  return (
    <div className="container-fluid">
      <div className="nk-content-inner">
        <div className="nk-content-body">
          <div className="nk-block-head nk-block-head-sm">
            <div className="nk-block-between">
              <div className="nk-block-head-content">
                <h3 className="nk-block-title fw-normal">Tasks</h3>
                <div className="nk-block-des text-soft"><p>You have total {tasks.length} tasks.</p></div>
              </div>
              <div className="nk-block-head-content">
                <div className="nk-block-tools-opt">
                  <button className="btn btn-primary" onClick={handleShow}>
                    <em className="icon ni ni-plus"></em>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="nk-block">
            <div className="nk-tb-list is-separate mb-3">
              <div className="nk-tb-item nk-tb-head">
                  <div className="nk-tb-col"><span className="sub-text">Title</span></div>
                  <div className="nk-tb-col tb-col-mb"><span className="sub-text">Details</span></div>
                  <div className="nk-tb-col tb-col-md"><span className="sub-text">Created At</span></div>
                  <div className="nk-tb-col tb-col-lg"><span className="sub-text">Status</span></div>
                  <div className="nk-tb-col tb-col-lg"><span className="sub-text">Deadline</span></div>
                  <div className="nk-tb-col tb-col-md"><span className="sub-text">Actions</span></div>
              </div>
              {loading ? <Loading/> : tasks.map((task, idx) => <Task key={idx} task={task}/>)}
            </div>
          </div>
        </div>
      </div>
      <TaskModal
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
      ></TaskModal>
    </div>
  )
}

const mapStateToProps = state => ({
    tasks: state.tasks.tasks
})

const mapDispatchToProps = {
    getListTasks, addTask
}

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);