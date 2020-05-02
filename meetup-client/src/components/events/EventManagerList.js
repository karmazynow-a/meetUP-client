import React from 'react'

import ManageEvent from './ManageEvent'

const EventManagerList = ({events}) => {
    var outputEvents = events && events.map(event => {
        return (
            <ManageEvent event={event} key={event.id}/>
        )
    })

    return (
        <div className="event-list section">
            {outputEvents}
        </div>
    )
}

export default EventManagerList;