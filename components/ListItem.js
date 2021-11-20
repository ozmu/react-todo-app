import Link from 'next/link'
import moment from 'moment';
import { computeAvatar } from '../utils/abbreviations';
import { calculatePercentage } from '../utils/calculations';

const List = props => {
    return (
        <div className="col-sm-6 col-lg-4 col-xxl-3">
            <div className="card h-100">
            <div className="card-inner">
                <div className="project">
                    <div className="project-head">
                        <Link href={{pathname: '/tasks', query: {listId: props.item.id ? props.item.id : 'unknown'}}}>
                            <a className="project-title">
                                <div className="user-avatar sq" style={{backgroundColor: '#' + props.item.color}}>
                                    <span>{computeAvatar(props.item.title)}</span>
                                </div>
                                <div className="project-info">
                                    <h6 className="title">{props.item.title}</h6>
                                    <span className="sub-text">
                                        <span className="badge badge-dim badge-warning">
                                            <em className="icon ni ni-clock"></em>
                                            <span title={props.item.createdAt}>{moment(props.item.createdAt).fromNow()}</span>
                                        </span>
                                    </span>
                                </div>
                            </a>
                        </Link>
                    </div>
                    <div className="project-details">
                        <p>{props.item.id 
                        ? `Example description to ${props.item.title} list. Click link for see tasks.`
                        : 'You have 2 ungrouped tasks.'}</p>
                    </div>
                    <div className="project-progress">
                        <div className="project-progress-details">
                            <div className="project-progress-task">
                                <em className="icon ni ni-check-round-cut"></em>
                                <span>{props.item.taskCount} Tasks</span>
                            </div>
                            <div className="project-progress-percent">{calculatePercentage(props.item.completedCount, props.item.taskCount)}%</div>
                        </div>
                        <div className="progress progress-pill progress-md bg-light">
                        <div className="progress-bar" data-progress="93.5" style={{width: calculatePercentage(props.item.completedCount, props.item.taskCount) + '%'}}></div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default List;