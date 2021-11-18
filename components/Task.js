export default (props) => {
    return (
        <>
            <div className="card">
                <h3>{props.task.title}</h3>
                <p>{props.task.details}</p>
                <div className="card-action">
                    <button className="btn btn-danger" onClick={() => props.deleteTask(this, props.task.id)}>Delete</button>
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