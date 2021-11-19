import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { useState } from 'react';

import Modal from '../components/utils/Modal';
import { changeTaskStatus, updateTask, deleteTask } from '../store/actions/main';

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
        <>
            <div className="card">
                <h3>{props.task.title}</h3>
                <p>{props.task.details}</p>
                <div className="card-action">
                    <Button variant="info" onClick={handleIsCompletedChange}>{isCompleted ? 'incomplete' : 'complete'}</Button>
                    <Button variant="info" onClick={handleShow}>Edit</Button>
                    <Button variant="danger" onClick={handleDeleteTask}>Delete</Button>
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
                    submit={updateTask}
                    ></Modal>
                </div>
            </div>
            <style jsx>
                {`

            .card {
                margin: 1rem;
                flex-basis: 100%;
                padding: 1.5rem;
                text-align: left;
                color: inherit;
                text-decoration: none;
                border: 1px solid #eaeaea;
                border-radius: 10px;
                transition: color 0.15s ease, border-color 0.15s ease;
            }
    
            .card:hover,
            .card:focus,
            .card:active {
                color: #0070f3;
                border-color: #0070f3;
            }
    
            .card h3 {
                margin: 0 0 1rem 0;
                font-size: 1.5rem;
            }
    
            .card p {
                margin: 0;
                font-size: 1.25rem;
                line-height: 1.5;
            }
                `}
            </style>
        </>
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