import { connect } from 'react-redux';
import { useState } from 'react';
import moment from 'moment';

import TaskModal from './utils/TaskModal';
import { changeTaskStatus, updateTask, deleteTask } from '../store/actions/tasks';

function Task(props){
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [title, setTitle] = useState(props.task.title);
    const handleTitleChange = (e) => setTitle(e.target.value);

    const [details, setDetails] = useState(props.task.details);
    const handleDetailsChange = (e) => setDetails(e.target.value);
    
    const [date, setDate] = useState(new Date(props.task.due).toISOString());
    const handleDateChange = (e) => setDate(e.toISOString());

    const [isCompleted, setIsCompleted] = useState(props.task.isCompleted);

    const handleIsCompletedChange = () => {
        props.changeTaskStatus(props.task);
        setIsCompleted(!isCompleted)
    };
    const updateTask = () => {
        props.updateTask({
            id: props.task.id,
            title,
            details,
            due: date,
            isCompleted: false
        });
        handleClose();
    }

    const handleDeleteTask = () => {
        props.deleteTask(props.task.id);
    }

    return (
        <div className="nk-tb-item">
            <div className="nk-tb-col">
                <span className="tb-amount">{props.task.title}</span>
            </div>
            <div className="nk-tb-col tb-col-mb">
                <span>{props.task.details}</span>
            </div>
            <div className="nk-tb-col tb-col-md">
                <span>{moment(props.task.createdAt).format('MMMM Do YYYY, hh:mm:ss a')}</span>
            </div>
            <div className="nk-tb-col tb-col-lg">
                <span className={'tb-status text-' + (props.task.isCompleted ? 'success' : 'danger')}>{props.task.isCompleted ? 'Completed' : 'Incompleted'}</span>
            </div>
            <div className="nk-tb-col tb-col-lg">
                <span className="badge badge-dim badge-warning">
                    <em className="icon ni ni-clock"></em>
                    <span title={props.task.due}>{moment(props.task.due).fromNow()}</span>
                </span>
            </div>
            <div className="nk-tb-col nk-tb-col-tools">
                <ul className="nk-tb-actions gx-1">
                    <li className="nk-tb-action-hidden">
                        <button className="btn btn-trigger btn-icon" title={`Mark ${props.task.isCompleted ? 'Incompleted': 'Completed'}`} onClick={handleIsCompletedChange}>
                            <em className={`icon ni ni-${props.task.isCompleted ? 'cross' : 'check'}-circle-fill`}></em>
                        </button>
                    </li>
                    <li className="nk-tb-action-hidden">
                        <button className="btn btn-trigger btn-icon" title="Edit" onClick={handleShow}>
                            <em className="icon ni ni-edit-fill"></em>
                        </button>
                    </li>
                    <li className="nk-tb-action-hidden">
                        <button className="btn btn-trigger btn-icon" title="Delete" onClick={handleDeleteTask}>
                            <em className="icon ni ni-trash-fill"></em>
                        </button>
                    </li>
                </ul>
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
            submit={updateTask}
            ></TaskModal>
        </div>
    )
}


const mapStateToProps = state => ({
    //tasks: state.main.tasks,
    //loading: state.main.loading
})

const mapDispatchToProps = {
    changeTaskStatus, updateTask, deleteTask
}

export default connect(mapStateToProps, mapDispatchToProps)(Task);