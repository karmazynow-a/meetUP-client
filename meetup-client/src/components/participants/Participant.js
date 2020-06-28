import React from 'react'


const Participant = ({participant}) => {
    return (
        <div className="card z-depth-0 event-summary">
            <div className="card-content grey-text text-darken-3">
                <p>{participant.fname} {participant.lname}</p>
            </div>
        </div>
    )
}

export default Participant;