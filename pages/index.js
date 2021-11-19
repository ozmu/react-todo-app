import { useEffect, useState } from "react";
import { connect } from 'react-redux';

import Modal from '../components/utils/Modal';
import { getTasks, addTask } from '../store/actions/main';

import Loading from '../components/utils/Loading';
import Task from '../components/Task';

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
    <div className="container-fluid">
      <div className="nk-content-inner">
        <div className="nk-content-body">
          <div className="nk-block-head nk-block-head-sm">
            <div className="nk-block-head-content">
              <h3 className="nk-block-title fw-normal">Task Lists</h3>
              <div className="nk-block-des text-soft"><p>You have total 95 lists.</p></div>
            </div>
          </div>
          <div className="nk-block">
            <div className="row g-gs">
              <div className="col-sm-6 col-lg-4 col-xxl-3">
                <div className="card h-100">
                  <div className="card-inner">
                      <div className="project">
                        <div className="project-head">
                            <a href="/demo2/apps-kanban.html" className="project-title">
                              <div className="user-avatar sq bg-purple"><span>DD</span></div>
                              <div className="project-info">
                                  <h6 className="title">Dashlite Development</h6>
                                  <span className="sub-text"><span className="badge badge-dim badge-warning"><em className="icon ni ni-clock"></em><span>5 Days Left</span></span></span>
                              </div>
                            </a>
                            <div className="drodown">
                              <a href="#" className="dropdown-toggle btn btn-sm btn-icon btn-trigger mt-n1 mr-n1" data-toggle="dropdown" aria-expanded="false"><em className="icon ni ni-more-h"></em></a>
                              <div className="dropdown-menu dropdown-menu-right" >
                                  <ul className="link-list-opt no-bdr">
                                    <li><a href="/demo2/apps-kanban.html"><em className="icon ni ni-eye"></em><span>View Project</span></a></li>
                                    <li><a href="#"><em className="icon ni ni-edit"></em><span>Edit Project</span></a></li>
                                    <li><a href="#"><em className="icon ni ni-check-round-cut"></em><span>Mark As Done</span></a></li>
                                  </ul>
                              </div>
                            </div>
                        </div>
                        <div className="project-details">
                            <p>Design and develop the DashLite template for Envato Marketplace.</p>
                        </div>
                        <div className="project-progress">
                            <div className="project-progress-details">
                              <div className="project-progress-task"><em className="icon ni ni-check-round-cut"></em><span>3 Tasks</span></div>
                              <div className="project-progress-percent">93.5%</div>
                            </div>
                            <div className="progress progress-pill progress-md bg-light">
                              <div className="progress-bar" data-progress="93.5" ></div>
                            </div>
                        </div>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
