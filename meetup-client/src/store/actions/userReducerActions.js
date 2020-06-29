import axios from 'axios';
import {config} from '../../config'

/**
 * Action to authenticate user. Received password is compared to
 * given one. If password is correct user details are updated.
 * Otherwise, state isAuth is set to false.
 */
export const authAction = (credentials) => {
    return (dispatch, getState) => {
        dispatch({type: 'RESET_AUTH'});
        
        console.log("Sending credentials...");
        let dbAuthlink = config.dblink + 'person/email/' + credentials.email + "/";
        axios.get(dbAuthlink)
            .then(res => {
                if(res.status === 200){
                    if (res.data[4] === credentials.password){

                        let userDetails = {
                            id: ""+res.data[0],
                            lname: res.data[2],
                            fname: res.data[1],
                            email: res.data[3],
                        }
                        console.log("Success");
                        dispatch({type: 'AUTH_USER', userDetails: userDetails});
                    } else {
                        console.log("Failure... wrong password");
                        dispatch({type: 'AUTH_FAILED'});
                    }
                }
                else {
                    console.log("Failure... wrong response status");
                    dispatch({type: 'AUTH_FAILED'});
                }
            });   
    }
}

/**
 * Action to update user's data. 
 */
export const editUserAction = (credentials) => {
    console.log("Sending credentials...");
    delete credentials.isLoading;
    
    return (dispatch, getState) => {
        let dbAuthlink = config.dblink + 'person/';

        axios.put(dbAuthlink, credentials)
            .then(res => {
                if(res.status === 200){
                    console.log("Success", res);
                    dispatch({ type: 'UPDATE_USER' });
                } else {
                    console.log("Failure...");
                }
            })
    }
}

/**
 * Action to create new user. After receiving successful response,
 * user is logged in by dispatching action.
 */
export const signupAction = (credentials) => {
    console.log("Sending credentials...");
    return (dispatch, getState) => {
        let dbAuthlink = config.dblink + 'person/';
        delete credentials.isLoading;

        axios.post(dbAuthlink, credentials)
            .then(res => {
                if(res.status === 200){
                    console.log(res);

                    //login the user
                    dispatch(authAction({
                        email: credentials.email,
                        password: credentials.password
                    }));

                    dispatch({ type: 'NEW_USER' });
                    console.log("Success");
                }
                else {
                    console.log("Failure... wrong response status", res.status);
                    dispatch({type: 'AUTH_FAILED'});
                }
            })
            .catch(error => {
                console.log("Failure... wrong response status", error.response.status);
                dispatch({type: 'AUTH_FAILED'});
            });
    }
}

/**
 * Action to logout user.
 */
export const logoutAction = () => {
    return (dispatch, getState) => {
        dispatch({type: 'LOGOUT_USER'});
    }
}

/**
 * Action to get all events that user (identified by id) is part of.
 */
export const getPartEventsAction = (id) => {
    return (dispatch, getState) => {
        let queryLink = config.dblink + "event/person/" + id;
        axios.get(queryLink)
            .then(res => {
                var eventList = []
                for (var r of res.data) {
                    eventList.push({
                        id : r[0],
                        name : r[1],
                        date : r[2],
                        author_id : r[3],
                        author_lname : r[4],
                        author_fname : r[5],
                    })
                }

                console.log("Person events are: ", eventList)

                dispatch({type: 'PERSON_EVENTS', events: eventList});
            });
    }
}

/**
 * Action to get all events that user (identified by id) is author of.
 */
export const getAuthorEventsAction = (id) => {
    return (dispatch, getState) => {
        let queryLink = config.dblink + "event/author/" + id;

        axios.get(queryLink)
            .then(res => {
                var eventList = []
                for (var r of res.data) {
                    eventList.push({
                        id : r[0],
                        name : r[1],
                        date : r[2],
                        key : r[3]
                    })
                }

                console.log("Author events are: ", eventList)

                dispatch({type: 'AUTHOR_EVENTS', events: eventList});
            })
        }
}