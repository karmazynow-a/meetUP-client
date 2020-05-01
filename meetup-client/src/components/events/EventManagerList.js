import React from 'react'

import ManageEvent from './ManageEvent'

const EventManagerList = () => {
    return (
        <div className="event-list section">
            <ManageEvent />
            <ManageEvent />
            <ManageEvent />
        </div>
    )
}

export default EventManagerList;