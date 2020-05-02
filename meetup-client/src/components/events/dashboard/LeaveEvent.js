import React, { Component } from 'react'
import { connect } from 'react-redux'
import {leaveEventAction} from '../../../store/actions/eventReducerActions'


class LeaveEvent extends Component {

    handleLeave = (e) => {
        //reduver to leave event
        console.log("leaving", this.props.event_id, this.props.person_id)
        this.props.leaveEventAction(this.props.event_id, this.props.person_id);
        
        this.props.history.push("/");
    }

    render() {
        return (
            <div className="section">
                <div className="card">
                    <div className="card-content">
                        <div className="row">
                            <div className="col s6 m8">
                                <span className="card-title">Leave event</span>
                            </div>
                            <div className="col s6 m4">
                                <a onClick={this.handleLeave} className="btn-floating waves-effect waves-light deep-purple lighten-1"><i className="material-icons">exit_to_app</i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        person_id: state.user.userDetails.id,
        event_id: state.event.details.id
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        leaveEventAction: (event_id, person_id) => dispatch(leaveEventAction(event_id, person_id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LeaveEvent);