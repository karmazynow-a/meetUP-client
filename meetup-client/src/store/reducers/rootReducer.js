import eventReducer from './eventReducer'
import userReducer from './userReducer'
import {combineReducers} from 'redux'

const rootReducer = combineReducers ({
    user: userReducer,
    event: eventReducer
})

export default rootReducer;