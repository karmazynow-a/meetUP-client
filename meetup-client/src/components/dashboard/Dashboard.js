import React, {Component} from 'react'
import EventList from '../events/EventList'
import FindEvent from '../events/FindEvent'
import LoginError from './LoginError'
import {connect} from 'react-redux'
import {getPartEventsAction} from '../../store/actions/userReducerActions'

class Dashboard extends Component {

    componentDidMount = () => {
        if (this.props.isAuth) {
            this.props.getPartEventsAction(this.props.userDetails.id);
        }
    }

    render(){
        return this.props.isAuth ? (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m6">
                        <EventList events={this.props.events}/>
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