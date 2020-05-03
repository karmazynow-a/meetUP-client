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
            .catch(error => {
                console.log("No comments found!")
                dispatch({type: 'EVENT_COMMENT', comments: []});
            });
        }
}

export const addCommAction = (comment) => {
    return (dispatch, getState) => {
        let queryLink = config.dblink + "comment/";

        axios.post(queryLink, comment)
            .then(res => {
                //refresh the comments
                dispatch(getEventCommAction(comment.event_id));
                dispatch({type: 'ADD_COMMENT'});
            })
        }    
}

export const deleteCommentAction = (id, event_id) => {
    return (dispatch, getState) => {
        let queryLink = config.dblink + "comment/" + id;

        axios.delete(queryLink)
            .then(res => {
                console.log(res);
                //refresh the comments
                dispatch(getEventCommAction(event_id));
                dispatch({type: 'DELETE_COMMENT'});
            })
        }    
}

export const findEventAction = (key) => {
    return (dispatch, getState) => {
        let queryLink = config.dblink + "event/key/" + key;

        axios.get(queryLink)
            .then(res => {
                if (res.status === 200){
                    //key is found

                    let id = res.data.id;
                    dispatch(getEventDetailsAction(id));
                    dispatch(getEventCommAction(id));
                    dispatch(getEventPartAction(id));
                    dispatch({type: 'FIND_EVENT', found: true});
                }
                else {
                    dispatch({type: 'FIND_EVENT', found: false});
                }
            })
            .catch(error => {
                console.log("Key not found!")
            });
        }    
}


import {getPartEventsAction} from './userReducerActions'

export const joinEventAction = (event_id, person_id) => {
    return (dispatch, getState) => {
        let queryLink = config.dblink + "participation/";
        console.log('joining', event_id, person_id);

        axios.post(queryLink, {person_id, event_id})
            .then(res => {
                console.log(res);

                dispatch(getEventPartAction(event_id));
                dispatch(getPartEventsAction(person_id));
                dispatch({type: 'JOIN_EVENT', found: false});
            })
        }    
}

//FIXME db issues
export const leaveEventAction = (event_id, person_id) => {
    return (dispatch, getState) => {
        let queryLink = config.dblink + "participation/" + person_id + "/" + event_id;
        axios.delete(queryLink)
            .then(res => {
                console.log(res);

                dispatch(getEventPartAction(event_id));
                dispatch(getPartEventsAction(person_id));

                dispatch({type: 'LEAVE_EVENT'});
            })
        }    
}


import {getAuthorEventsAction} from './userReducerActions'
export const deleteEventAction = (id, author_id) => {
    return (dispatch, getState) => {
        let queryLink = config.dblink + "event/" + id;
        console.log(id, author_id);

        axios.delete(queryLink)
            .then(res => {
                console.log(res.status);

                dispatch(getAuthorEventsAction(author_id));
                dispatch({type: 'DELETE_EVENT'});
            })
        }    
}

export const addEventAction = (event) => {
    return (dispatch, getState) => {
        let queryLink = config.dblink + "event/";

        axios.post(queryLink, event)
            .then(res => {

                dispatch(joinEventAction(event.id, event.author_id));
                dispatch(getAuthorEventsAction(event.author_id));
                dispatch({type: 'ADD_EVENT'});
            })
        }    
}

export const editEventAction = (event) => {
    return (dispatch, getState) => {
        let queryLink = config.dblink + "event/";

        console.log(event);

        axios.put(queryLink, event)
            .then(res => {
                console.log(res.status);
                dispatch(getAuthorEventsAction(event.author_id));
                dispatch({type: 'EDIT_EVENT'});
            })
        }    
}