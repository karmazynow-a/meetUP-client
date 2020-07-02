import React from 'react'


/**
 * Empty event to handle empty events lists.
 */
const EmptyEvent = () => {
    return (
        <div className="card event-summary">
            <div className="card-content grey-text text-darken-3">
                <span className="card-title"> No upcoming events! </span>
            </div>
        </div>
    )
}

export default EmptyEvent;