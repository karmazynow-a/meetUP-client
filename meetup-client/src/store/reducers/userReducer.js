// currently logged in user

const initState = {
    isAuth: false,
    userDetails: {},
    events: [],
    author_events: []
}

const userReducer = (state = initState, action) => {
    if (action.type === 'AUTH_USER') {
        return {
            ...state,
            isAuth: true,
            userDetails: action.userDetails
        }
    }
    else if (action.type === 'NEW_USER') {
        return state
    }
    else if (action.type === 'LOGOUT_USER') {
        return {
            ...state,
            isAuth: false,
            userDetails: {}
        }
    }
    else if (action.type === 'PERSON_EVENTS'){
        return {
            ...state,
            events: action.events
        }
    }
    else if (action.type === 'AUTHOR_EVENTS'){
        return {
            ...state,
            author_events: action.events
        }
    }

    return state;
}

export default userReducer