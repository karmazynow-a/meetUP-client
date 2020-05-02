import axios from 'axios';
import {config} from '../../config'

//TODO : auth after the db fix
export const authAction = (credentials) => {
    return (dispatch, getState) => {
        /*
        let dbAuthlink = config.dblink + 'person/mail/' + credentials.mail;
        axios.get(dbAuthlink)
            .then(res => {
                console.log(res);
                //TODO actually authenticate


            });
            */
           let userDetails = {
            id: '1',
            lname: 'dummy lname',
            fname: 'dummy fname',
            mail: 'dummy mail',
        }

        console.log(userDetails)

        dispatch({type: 'AUTH_USER', userDetails: userDetails});
    }
}

//TODO: link to component
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
