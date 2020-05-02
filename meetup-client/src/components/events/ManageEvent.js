import React from 'react'

const ManageEvent = ({event}) => {
    return (
        <div className="card event-summary">
            <div className="card-content grey-text text-darken-3">
                <div className="row">
                    <div className="col s12 m8">
                        <span className="card-title">{event.name}</span>
                        <p className="grey-text">{event.key}</p>
                        <p className="grey-text">{event.date}</p>
                    </div>
                    <div className="col s12 m1">
                        <div className="input-field">
                            <a className="btn-floating waves-effect waves-light deep-purple lighten-1"><i className="material-icons">edit</i></a>
                        </div>
                        <div className="input-field">
                            <a className="btn-floating waves-effect waves-light deep-purple lighten-1"><i className="material-icons">delete</i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManageEvent;