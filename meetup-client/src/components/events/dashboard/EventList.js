import React from 'react'
import moment from 'moment'

import EventSummary from '../EventSummary'
import EmptyEvent from '../EmptyEvent'


/**
 * Display list of future events, sorted by date.
 */
const EventList = ({events}) => {
    var sortedEvents = events.sort((a,b) => {
        return moment(a.date, 'DD-MM-YYYY HH:mm').toDate().getTime() - 
        moment(b.date, 'DD-MM-YYYY HH:mm').toDate().getTime()
    });

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