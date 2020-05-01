import React, { Component } from 'react'

import EventSummary from './EventSummary'
import ParticipantList from './participants/ParticipantList'
import CommentList from './comments/CommentList'
import CreateComment from './comments/CreateComment'

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

const EventDetails = () => {
    //const id = props.match.params.id;
    return (
        <div className="dashboard container">
            <div className="row">
                <div className="col s12 m6">
                    <div className="section">
                        <EventSummary />
                    </div>
                    <ParticipantList />
                </div>
                <div className="col s12 m5 offset-m1">
                    <AddCommentSection />
                    <CommentList />
                </div>
            </div>
        </div>
    )
}

export default EventDetails;