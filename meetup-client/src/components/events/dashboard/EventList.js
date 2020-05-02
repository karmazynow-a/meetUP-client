import React from 'react'

import EventSummary from '../EventSummary'
import EmptyEvent from '../EmptyEvent'


const EventList = ({events}) => {

    var outputEvents = events && events.map(event => {
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