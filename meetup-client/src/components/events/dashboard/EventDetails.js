import React, { Component } from 'react'
import {connect} from 'react-redux'

import EventSummary from '../EventSummary'
import ParticipantList from '../../participants/ParticipantList'
import CommentList from '../../comments/CommentList'
import CreateComment from '../../comments/CreateComment'
import LeaveEvent from './LeaveEvent'
import LoginError from '../../authentication/LoginError'
import {getEventDetailsAction, getEventPartAction, getEventCommAction} from '../../../store/actions/eventReducerActions'


/**
 * Simmilar to AddEventSection, component to store CreateComment component, that will appear on button click.
 */
class AddCommentSection extends Component {
    state = {
        createFormVisible: false,
    }

    handleClick = (e) => {
        this.setState({
            ...this.state,
            createFormVisible: ~this.state.createFormVisible,
        });
    }

    commentDone = () => {
        this.setState({
            ...this.state,
            createFormVisible: false,
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
                {this.state.createFormVisible ? <CreateComment comment_done={this.commentDone} /> : ''}
            </div>
        )
    }
}



/**
 * Display details about event including participant list, summary and comments section.
 */
class EventDetails extends Component {
    
    componentDidMount = () => {
        var id = this.props.match.params.id;

        this.props.getEventPartAction(id);
        this.props.getEventDetailsAction(id);
        this.props.getEventCommAction(id);
    }

    render() {
        return this.props.isAuth ? (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m6">
                        <div className="section">
                            <EventSummary event={this.props.details}/>
                        </div>
                        <ParticipantList participants={this.props.participants}/>
                    </div>
                    <div className="col s12 m5 offset-m1">
                        { ( parseInt(this.props.person_id, 10) !== this.props.details.author_id) ? <LeaveEvent /> : ""}
                        <AddCommentSection />
                        <CommentList comments={this.props.comments}/>
                    </div>
                </div>
            </div>
        ) : <LoginError/>
    }
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.user.isAuth,
        person_id: state.user.userDetails.id,
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