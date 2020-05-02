import axios from 'axios';
import {config} from '../../config'


export const getEventDetailsAction = (id) => {
    return (dispatch, getState) => {
        let queryLink = config.dblink + "event/details/" + id;

        axios.get(queryLink)
            .then(res => {
                let res_data = { ...res.data[0], id: id }
                dispatch({type: 'EVENT_DETAILS', event_details: res_data});
            })
        }
}

export const getEventPartAction = (id) => {
    return (dispatch, getState) => {
        let queryLink = config.dblink + "participation/event/" + id;

        axios.get(queryLink)
            .then(res => {
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

export const addCommAction = (comment) => {
    return (dispatch, getState) => {
        let queryLink = config.dblink + "comment/";

        axios.post(queryLink, comment)
            .then(res => {
                console.log(res);
                //refresh the comments
                getEventCommAction(comment.event_id);
                dispatch({type: 'ADD_COMMENT'});
            })
        }    
}

export const deleteCommentAction = (id) => {
    return (dispatch, getState) => {
        let queryLink = config.dblink + "comment/" + id;

        axios.delete(queryLink)
            .then(res => {
                console.log(res);
                //refresh the comments
                //getEventCommAction(comment.event_id);

                dispatch({type: 'DELETE_COMMENT'});
            })
        }    
}

//TODO
export const findEventAction = (key) => {
    return (dispatch, getState) => {
        let queryLink = config.dblink + "comment/";

        axios.get(queryLink)
            .then(res => {
                console.log(res);
                let id = res.id;
                getEventDetailsAction(id);
                getEventCommAction(id);
                getEventPartAction(id);

                dispatch({type: 'FIND_EVENT'});
            })
        }    
}

//TODO
import getPartEventsAction from './userReducerActions'

export const joinEventAction = (event_id, person_id) => {
    return (dispatch, getState) => {
        let queryLink = config.dblink + "participation/";

        axios.post(queryLink)
            .then(res => {
                console.log(res);

                getEventPartAction(event_id);
                getPartEventsAction(person_id);

                dispatch({type: 'JOIN_EVENT'});
            })
        }    
}

export const leaveEventAction = (event_id, person_id) => {
    return (dispatch, getState) => {
        let queryLink = config.dblink + "participation/";

        axios.delete(queryLink)
            .then(res => {
                console.log(res);

                getEventPartAction(event_id);
                getPartEventsAction(person_id);

                dispatch({type: 'LEAVE_EVENT'});
            })
        }    
}

export const deleteEventAction = (id) => {
    return (dispatch, getState) => {
        let queryLink = config.dblink + "event/" + id;

        axios.delete(queryLink)
            .then(res => {
                console.log(res);

                // update sth

                dispatch({type: 'DELETE_EVENT'});
            })
        }    
}

export const addEventAction = (event) => {
    return (dispatch, getState) => {
        let queryLink = config.dblink + "event/";

        axios.post(queryLink, event)
            .then(res => {
                console.log(res);

                // update sth

                dispatch({type: 'ADD_EVENT'});
            })
        }    
}

export const editEventAction = (event) => {
    return (dispatch, getState) => {
        let queryLink = config.dblink + "event/";

        axios.put(queryLink, event)
            .then(res => {
                console.log(res);

                // update sth

                dispatch({type: 'EDIT_EVENT'});
            })
        }    
}