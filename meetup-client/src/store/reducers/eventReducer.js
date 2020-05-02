//currently processed event

const initState = {
    details: {},
    participants: [],
    comments: []
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

    return state;
}

export default eventReducer