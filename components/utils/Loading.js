export default () => {
    return (
        <>
            <div className="loading-container">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
            <style jsx>
                {`
                    .loading-container {
                        display: block;
                        margin: 0 auto;
                    }
                `}
            </style>
        </>
    )
}