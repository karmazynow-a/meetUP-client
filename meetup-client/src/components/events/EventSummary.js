import React from 'react'

import {NavLink} from 'react-router-dom'


/**
 * Displays summary of event - name, date, and organizator data.
 */
const EventSummary = ({event}) => {
    return (
        <div className="card event-summary">
            <div className="card-content grey-text text-darken-3">
                <span className="card-title">
                    <NavLink to={'/event/' + event.id}> {event.name}</NavLink>
                    </span>
                <p>{event.author_fname} {event.author_lname}</p>
                <p className="grey-text">{event.date}</p>
            </div>
        </div>
    )
}

export default EventSummary;