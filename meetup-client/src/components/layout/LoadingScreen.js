import React from 'react'


const LoadingScreen = () => {
    return (
        <div className="container">
            <div className="section">
                <div className="row">
                    <div className="col s12 m6 offset-m3">
                        <div className="card">
                            <div className="card-content  center">
                                <p className="card-title">Loading...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoadingScreen;