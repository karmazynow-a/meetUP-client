import axios from 'axios';
import {config} from '../../config'

export const authAction = (credentials) => {
    return (dispatch, getState) => {
        let dbAuthlink = config.dblink + 'person/email/' + credentials.email + "/";
        axios.get(dbAuthlink)
            .then(res => {
                if(res.status === 200){
                    if (res.data.password === credentials.password){

                        let userDetails = {
                            id: ""+res.data.id,
                            lname: res.data.lname,
                            fname: res.data.fname,
                            email: res.data.email,
                        }

                        dispatch({type: 'AUTH_USER', userDetails: userDetails});
                    } else {
                        alert("Wrong e-mail or password!")
                    }

                }
            });   
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

                dispatch({type: 'PERSON_EVENTS', events: res.data});
            });
    }
}

export const getAuthorEventsAction = (id) => {
    return (dispatch, getState) => {
        let queryLink = config.dblink + "event/author/" + id;

        axios.get(queryLink)
            .then(res => {

                dispatch({type: 'AUTHOR_EVENTS', events: res.data});
            })
        }
}
