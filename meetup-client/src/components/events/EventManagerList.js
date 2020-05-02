import React from 'react'

import ManageEvent from './ManageEvent'
import EmptyEvent from './EmptyEvent'

const EventManagerList = ({events}) => {
    var outputEvents = events && events.map(event => {
        return (
            <ManageEvent event={event} key={event.id}/>
        )
    })

    outputEvents = events.length ? outputEvents : <EmptyEvent />;

    return (
        <div className="event-list section">
            {outputEvents}
        </div>
    )
}

export default EventManagerList;