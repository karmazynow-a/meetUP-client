/**
 * Initial state of store used to hold information about currently processed event.
 */
const initState = {
    details: {},
    participants: [],
    comments: [],
    isParticipant: false,
    isLatestKeyFound: null,
}

const eventReducer = (state = initState, action) => {
    if (action.type === 'EVENT_DETAILS') {
        return {
            ...state,
            details: action.event_details
        }
    }
    else if (action.type === 'EVENT_PART') {
        return {
            ...state,
            participants: action.participants
        }
    }
    else if (action.type === 'EVENT_COMMENT') {
        return {
            ...state,
            comments: action.comments
        }
    }
    else if (action.type === 'FIND_EVENT') {
        return {
            ...state,
            isParticipant: false,
            isLatestKeyFound: action.found
        }
    }
    else if (action.type === 'CLEAR_KEY') {
        return {
            ...state,
            isLatestKeyFound: null
        }
    }

    return state;
}

export default eventReducer