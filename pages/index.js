import { useEffect } from "react";
import { connect } from 'react-redux';
import { getTasks } from '../store/actions/tasks';
import Loading from '../components/utils/Loading';
import ListItem from '../components/ListItem';

function Home(props) {
  const { loading, count, tasks, listItems } = props;

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
              <div className="nk-block-des text-soft"><p>You have total {listItems.length} lists.</p></div>
            </div>
          </div>
          <div className="nk-block">
            <div className="row g-gs">
              {loading ? <Loading/> : listItems.map((item, idx) => <ListItem key={idx} item={item}/>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


const mapStateToProps = state => ({
  loading: state.tasks.loading,
  count: state.tasks.count,
  tasks: state.tasks.tasks,
  listItems: state.tasks.lists
})

const mapDispatchToProps = {
  getTasks
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
