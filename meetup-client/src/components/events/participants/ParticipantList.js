import React from 'react'

import Participant from './Participant'

const ParticipantList = () => {
    return (
        <div className="participant-list section card">
            <div className="card-content">
                <span className="card-title">Participants</span>
                <Participant />
                <Participant />
                <Participant />
            </div>
        </div>
    )
}

export default ParticipantList;