import React from 'react'

import Participant from './Participant'


/**
 * Display list of participants wrapped in Participant component.
 */
const ParticipantList = ({participants}) => {

    var outputParticipants = participants && participants.map(participant => {
        return (
            <Participant participant={participant} key={Math.random()}/>
        )
    })

    return (
        <div className="participant-list section card">
            <div className="card-content">
                <span className="card-title">Participants</span>
                {outputParticipants}
            </div>
        </div>
    )
}

export default ParticipantList;