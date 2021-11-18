import Head from 'next/head'

import { connect } from 'react-redux';
import { getTasks } from '../store/actions/main';

import {useEffect, useState} from "react";
import Loading from '../components/utils/Loading';
import Task from '../components/Task';

const deleteTask = (self, id) => {
  fetch('/api/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({id}),
  })
  .then(res => res.json()).
  then(data => {
    if (data.error){
      alert(data.error);
    }
    else {
      alert(data.message);
      const arr = [...self.state.tasks];
      const index = arr.findIndex(task => task.id === id);
      arr.splice(index, 1);
      this.setState({tasks: arr});
    }
  })
}

function Home(props) {
  const { loading, tasks } = props;

  console.log('props: ', props)

  const [data, setData] = useState([]);
  //const [loading, setLoading] = useState(false);
  const [todo, setTodo] = useState('');

  /*
  let loadTodos = () => {
    fetch('/api/list').then(res => res.json()).then(data => {
      setData(data);
      //useDispatch(addTask(data));
      setLoading(false);
    })
  }
  */

  useEffect(() => {
    //setLoading(true)
    //loadTodos()
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

        <div className="grid">
          {loading ? <Loading /> : tasks.map((task, idx) => <Task key={idx} task={task} deleteTask={deleteTask}/>)}
        </div>
      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}


const mapStateToProps = state => ({
  tasks: state.main.tasks,
})

const mapDispatchToProps = {
  getTasks
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
