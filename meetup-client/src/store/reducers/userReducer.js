// currently logged in user

const initState = {
    isAuth: false,
    userDetails: {},
    events: [],
    author_events: [],
    isLoading: false
}

const userReducer = (state = initState, action) => {
    if (action.type === 'AUTH_USER') {
        return {
            ...state,
            isAuth: true,
            isLoading: false,
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
            isLoading: false,
            userDetails: {}
        }
    }
    else if (action.type === 'PERSON_EVENTS'){
        return {
            ...state,
            isLoading: false,
            events: action.events
        }
    }
    else if (action.type === 'AUTHOR_EVENTS'){
        return {
            ...state,
            isLoading: false,
            author_events: action.events
        }
    }
    else if (action.type === 'IS_LOADING'){
        return {
            ...state,
            isLoading: true
        }
    }


    return state;
}

export default userReducer