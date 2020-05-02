//currently processed event

const initState = {
    details: {},
    participants: [],
    comments: [],
    isParticipant: false,
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
    else if (action.type === 'ADD_COMMENT') {
        return state
    }
    else if (action.type === 'DELETE_COMMENT') {
        return state
    }
    else if (action.type === 'FIND_EVENT') {
        return {
            ...state,
            isParticipant: false
        }
    }
    else if (action.type === 'JOIN_EVENT') {
        return state;
    }
    else if (action.type === 'DELETE_EVENT') {
        return state;
    }
    else if (action.type === 'ADD_EVENT') {
        return state;
    }
    else if (action.type === 'EDIT_EVENT') {
        return state;
    }


    return state;
}

export default eventReducer