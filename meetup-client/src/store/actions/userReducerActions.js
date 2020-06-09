import axios from 'axios';
import {config} from '../../config'

export const authAction = (credentials) => {
    return (dispatch, getState) => {
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

                        dispatch({type: 'AUTH_USER', userDetails: userDetails});
                    } else {
                        alert("Wrong e-mail or password!")
                    }

                }
            });   
    }
}

export const editUserAction = (credentials) => {
    return (dispatch, getState) => {
        let dbAuthlink = config.dblink + 'person/';

        axios.put(dbAuthlink, credentials)
            .then(res => {
                console.log(res.status);

                //login the user
                dispatch(authAction({
                    email: credentials.email,
                    password: credentials.password
                }));

                dispatch({ type: 'UPDATE_USER' });
            })
    }
}

export const signupAction = (credentials) => {
    return (dispatch, getState) => {
        let dbAuthlink = config.dblink + 'person/';

        axios.post(dbAuthlink, credentials)
            .then(res => {
                console.log(res.status);

                //login the user
                dispatch(authAction({
                    email: credentials.email,
                    password: credentials.password
                }));

                dispatch({ type: 'NEW_USER' });
            })
    }
}

export const logoutAction = () => {
    return (dispatch, getState) => {
        dispatch({type: 'LOGOUT_USER'});
    }
}

export const getPartEventsAction = (id) => {
    return (dispatch, getState) => {
        let queryLink = config.dblink + "event/person/" + id;
        axios.get(queryLink)
            .then(res => {
                var eventList = []
                for (var e of res.data) {
                    eventList.push({
                        id : e[0],
                        name : e[1],
                        date : e[2],
                        key : e[3],
                    })
                }

                dispatch({type: 'PERSON_EVENTS', events: eventList});
            });
    }
}

export const getAuthorEventsAction = (id) => {
    return (dispatch, getState) => {
        let queryLink = config.dblink + "event/author/" + id;

        axios.get(queryLink)
            .then(res => {
                console.log(res)
                var eventList = []
                for (var e of res.data) {
                    eventList.push({
                        id : e[0],
                        name : e[1],
                        date : e[2],
                        author_id : e[3],
                        author_lname : e[4],
                        author_fname : e[5],
                    })
                }

                dispatch({type: 'AUTHOR_EVENTS', events: eventList});
            })
        }
}

export const loadingAction = () => {
    return (dispatch, getState) => {
        dispatch({type: 'IS_LOADING'});
    }
}
