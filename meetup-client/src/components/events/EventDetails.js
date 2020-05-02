import React, { Component } from 'react'

import EventSummary from './EventSummary'
import ParticipantList from './participants/ParticipantList'
import CommentList from './comments/CommentList'
import CreateComment from './comments/CreateComment'
import {connect} from 'react-redux'
import {getEventDetailsAction, getEventPartAction, getEventCommAction} from '../../store/actions/eventReducerActions'
import LeaveEvent from './LeaveEvent'

// wrapper for CreateComment
class AddCommentSection extends Component {
    state = {
        createFormVisible: false,
    }

    handleClick = () => {
        this.setState({
            ...this.state,
            createFormVisible: ~this.state.createFormVisible,
        });
    }

    render() {
        return (
            <div className="section">
                <div className="card">
                    <div className="card-content grey-text text-darken-3">
                        <div className="row">
                            <div className="col s6 m8">
                                <span className="card-title">Add comment</span>
                            </div>
                            <div className="col s6 m4">
                                <a className="btn-floating waves-effect waves-light deep-purple lighten-1" onClick={this.handleClick}><i className="material-icons">add</i></a>
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.createFormVisible ? <CreateComment /> : ''}
            </div>
        )
    }
}


class EventDetails extends Component {
    
    componentDidMount = () => {
        var id = this.props.match.params.id;

        this.props.getEventDetailsAction(id);
        this.props.getEventPartAction(id);
        this.props.getEventCommAction(id);
    }

    render() {
        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m6">
                        <div className="section">
                            <EventSummary event={this.props.details}/>
                        </div>
                        <ParticipantList participants={this.props.participants}/>
                    </div>
                    <div className="col s12 m5 offset-m1">
                        <LeaveEvent />
                        <AddCommentSection />
                        <CommentList comments={this.props.comments}/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        details: state.event.details,
        participants: state.event.participants,
        comments: state.event.comments
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getEventDetailsAction: (id) => dispatch(getEventDetailsAction(id)),
        getEventCommAction: (id) => dispatch(getEventCommAction(id)),
        getEventPartAction: (id) => dispatch(getEventPartAction(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventDetails);