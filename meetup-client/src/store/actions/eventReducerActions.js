import axios from 'axios';
import {config} from '../../config'

/**
 * Action to get details of event based on its id.
 */
export const getEventDetailsAction = (id) => {
    return (dispatch, getState) => {
        let queryLink = config.dblink + "event/details/" + id;

        axios.get(queryLink)
            .then(res => {
                let res_data = res.data[0]
                var eventData = {
                    id : id,
                    name : res_data[0],
                    date : res_data[1],
                    key : res_data[2],
                    author_id : res_data[3],
                    author_lname : res_data[4],
                    author_fname : res_data[5]
                }
                
                dispatch({type: 'EVENT_DETAILS', event_details: eventData});
            })
        }
}

/**
 * Action to get all participants of event by its id.
 */
export const getEventPartAction = (id) => {
    return (dispatch, getState) => {
        let queryLink = config.dblink + "participation/event/" + id;

        axios.get(queryLink)
            .then(res => {

                var partList = []
                for (var e of res.data) {
                    partList.push({
                        lname : e[0],
                        fname : e[1]
                    })
                }

                dispatch({type: 'EVENT_PART', participants: partList});
            })
        }
}

/**
 * Action to get all comments of event by its id.
 */
export const getEventCommAction = (id) => {
    return (dispatch, getState) => {
        let queryLink = config.dblink + "comment/event/" + id;

        axios.get(queryLink)
            .then(res => {
                var comentList = []
                for (var e of res.data) {
                    comentList.push({
                        content : e[0],
                        date : e[1],
                        id : e[2],
                        event_id : e[3],
                        author_id : e[4],
                        author_lname : e[5],
                        author_fname : e[6],
                    })
                }

                dispatch({type: 'EVENT_COMMENT', comments: comentList});
            })
            .catch(error => {
                console.log("No comments found!")
                dispatch({type: 'EVENT_COMMENT', comments: []});
            });
        }
}

/**
 * Action to add comment.
 * Afted successful execution new list of comment is downloaded
 * by dispatching getEventCommAction action.
 */
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

/**
 * Action to delete comment.
 * Afted successful execution new list of comment is downloaded
 * by dispatching getEventCommAction action.
 */
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

/**
 * Action to find event by key. If it's not found, state isLatestKeyFound
 * is set to false. Otherwise, the details, comments and participatns 
 * are downloaded by dispatching actions.
 */
export const findEventAction = (key) => {
    return (dispatch, getState) => {
        dispatch({type: 'CLEAR_KEY'});

        let queryLink = config.dblink + "event/key/" + key;

        axios.get(queryLink)
            .then(res => {
                if (res.status === 200 && res.data.length){
                    //key is found
                    console.log("Key found!");

                    let id = res.data[0][0];
                    dispatch(getEventDetailsAction(id));
                    dispatch(getEventCommAction(id));
                    dispatch(getEventPartAction(id));
                    dispatch({type: 'FIND_EVENT', found: true});
                }
                else {
                    console.log("Key not found!");
                    dispatch({type: 'FIND_EVENT', found: false});
                }
            })
            .catch(error => {
                dispatch({type: 'FIND_EVENT', found: false});
                console.log("Key not found!");
            });
        }    
}

/**
 * Action to join event based on event's and person's ids.
 * After than the participants and events lists are refreshed.
 */
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
                dispatch({type: 'CLEAR_KEY'});
            })
        }    
}

/**
 * Action to leave event based on event's and person's ids.
 * After than the participants and events lists are refreshed.
 */
export const leaveEventAction = (event_id, person_id) => {
    return (dispatch, getState) => {
        let queryLink = config.dblink + "participation/" + person_id + "/" + event_id;
        axios.delete(queryLink)
            .then(res => {
                console.log("Leave", res);
                if (res.data === -1) {
                    alert("You cannot leave own event!");
                    return;
                }

                dispatch(getEventPartAction(event_id));
                dispatch(getPartEventsAction(person_id));

                dispatch({type: 'LEAVE_EVENT'});
            })
        }    
}

/**
 * Action to delete event based on event's and authors's ids.
 * After than the events list is refreshed.
 */
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

/**
 * Action to add new event. After receiving response, author of the event is
 * added as a participant and author's event list is refreshed.
 */
export const addEventAction = (event) => {
    return (dispatch, getState) => {
        let queryLink = config.dblink + "event/";

        axios.post(queryLink, event)
            .then(res => {
                dispatch(joinEventAction(res.data, event.author_id));
                dispatch(getAuthorEventsAction(event.author_id));
                dispatch({type: 'ADD_EVENT'});
            })
        }    
}

/**
 * Action to edit event. After receiving response author's event list is refreshed.
 */
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