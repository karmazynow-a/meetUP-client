import React from 'react'

import EventSummary from '../EventSummary'
import EmptyEvent from '../EmptyEvent'


const EventList = ({events}) => {
    var sortedEvents = events.sort((a,b) => {
        return new Date(a.date).getTime() - 
            new Date(b.date).getTime()
    }).reverse();

    var outputEvents = sortedEvents && sortedEvents.map(event => {
        return (
            <EventSummary event={event} key={event.id}/>
        )
    })

    outputEvents = events.length ? outputEvents : <EmptyEvent />;

    return (
        <div className="event-list section">
            {outputEvents}
        </div>
    )
}

export default EventList;