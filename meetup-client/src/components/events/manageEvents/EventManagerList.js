import React from 'react'

import ManageEvent from './ManageEvent'
import EmptyEvent from '../EmptyEvent'

const EventManagerList = ({events}) => {
    var sortedEvents = events.sort((a,b) => {
        return new Date(a.date).getTime() - 
            new Date(b.date).getTime()
    }).reverse();

    var outputEvents = sortedEvents && sortedEvents.map(event => {
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