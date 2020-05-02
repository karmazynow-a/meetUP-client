import axios from 'axios';
import {config} from '../../config'


export const getEventDetailsAction = (id) => {
    return (dispatch, getState) => {
        let queryLink = config.dblink + "event/details/" + id;

        axios.get(queryLink)
            .then(res => {
                console.log(res);
                dispatch({type: 'EVENT_DETAILS', event_details: res.data[0]});
            })
        }
}

export const getEventPartAction = (id) => {
    return (dispatch, getState) => {
        let queryLink = config.dblink + "participation/event/" + id;

        axios.get(queryLink)
            .then(res => {
                console.log(res);
                dispatch({type: 'EVENT_PART', participants: res.data});
            })
        }
}

export const getEventCommAction = (id) => {
    return (dispatch, getState) => {
        let queryLink = config.dblink + "comment/event/" + id;

        axios.get(queryLink)
            .then(res => {
                dispatch({type: 'EVENT_COMMENT', comments: res.data});
            })
        }
}