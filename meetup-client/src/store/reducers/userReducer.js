/**
 * Initial state of store used to hold information about currently logged in user.
 */
const initState = {
    isAuth: null,
    userDetails: {},
    events: [],
    authorEvents: [],
    isLoading: false
}

const userReducer = (state = initState, action) => {
    if (action.type === 'AUTH_USER') {
        return {
            ...state,
            isAuth: true,
            userDetails: action.userDetails
        }
    }
    else if (action.type === 'AUTH_FAILED') {
        return {
            ...state,
            isAuth: false,
        }
    }
    else if (action.type === 'RESET_AUTH') {
        return {
            ...state,
            isAuth: null,
        }
    }
    else if (action.type === 'LOGOUT_USER') {
        return {
            ...state,
            isAuth: null,
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
            authorEvents: action.events
        }
    }

    return state;
}

export default userReducer