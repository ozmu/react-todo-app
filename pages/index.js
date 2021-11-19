import { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { getLists } from '../store/actions/list';
import Loading from '../components/utils/Loading';
import ListItem from '../components/ListItem';

function Home(props) {
  const { loading, count, listItems } = props;

  useEffect(() => {
    props.getLists();
  }, []);

  return (
    <div className="container-fluid">
      <div className="nk-content-inner">
        <div className="nk-content-body">
          <div className="nk-block-head nk-block-head-sm">
            <div className="nk-block-head-content">
              <h3 className="nk-block-title fw-normal">Task Lists</h3>
              <div className="nk-block-des text-soft"><p>You have total {count} lists.</p></div>
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
  loading: state.list.loading,
  count: state.list.count,
  listItems: state.list.items
})

const mapDispatchToProps = {
  getLists
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
