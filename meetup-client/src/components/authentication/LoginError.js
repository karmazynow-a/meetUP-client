import React from 'react'


/**
 * Functional component to display error for unlogged user
 */
const LoginError = () => {
    return (
        <div className="container">
            <div className="section">
                <div className="row">
                    <div className="col s12 m6 offset-m3">
                        <div className="card">
                            <div className="card-content  center">
                                <p className="card-title">Please log in or sign up</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginError;