import eventReducer from './eventReducer'
import userReducer from './userReducer'
import {combineReducers} from 'redux'


/**
 * Reducer to combine two reducers - event and user.
 */
const rootReducer = combineReducers ({
    user: userReducer,
    event: eventReducer
})

export default rootReducer;