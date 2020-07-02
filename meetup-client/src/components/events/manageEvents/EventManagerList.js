import React from 'react'
import moment from 'moment'

import ManageEvent from './ManageEvent'
import EmptyEvent from '../EmptyEvent'


/**
 * Displays list with events in event manager dashboard.
 */
const EventManagerList = ({events}) => {
    var sortedEvents = events.sort((a,b) => {
        return moment(a.date, 'DD-MM-YYYY HH:mm') - 
        moment(b.date, 'DD-MM-YYYY HH:mm')
    });


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