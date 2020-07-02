import React, {Component} from 'react'
import moment from 'moment'
import {connect} from 'react-redux'

import EventList from '../events/dashboard/EventList'
import FindEvent from '../events/dashboard/FindEvent'
import LoginError from '../authentication/LoginError'
import {getPartEventsAction} from '../../store/actions/userReducerActions'


/**
 * Displays user's dashboard with lists of events, that user is participating in and
 * form to find new events.
 */
class Dashboard extends Component {

    componentDidMount = () => {
        if (this.props.isAuth) {
            this.props.getPartEventsAction(this.props.userDetails.id);
        }
    }

    render(){
        var incomingEvents = this.props.events.filter( event => moment(event.date, 'DD-MM-YYYY HH:mm') > moment() );

        return this.props.isAuth ? (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m6">
                        <EventList events={incomingEvents}/>
                    </div>
                    <div className="col s12 m5 offset-m1">
                        <FindEvent/>
                    </div>
                </div>
            </div>
        ) : ( <LoginError /> )
    }
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.user.isAuth,
        userDetails: state.user.userDetails,
        events: state.user.events
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPartEventsAction: (id) => dispatch(getPartEventsAction(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);