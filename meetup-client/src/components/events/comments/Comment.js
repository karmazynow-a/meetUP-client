import React, { Component } from 'react'
import {connect} from 'react-redux'
import {deleteCommentAction} from '../../../store/actions/eventReducerActions'

class Comment extends Component {

    handleClick = (e) => {
        //FIX ME comment should has also event id
        console.log("deleting", this.props.comment.id, ' from event ', this.props.comment.event_id);
        this.props.deleteCommentAction(this.props.comment.id, this.props.comment.event_id);
    }

    render() {
        let deleteBtn = ( parseInt(this.props.person_id, 10) === this.props.comment.author_id) ? (
            <a onClick={this.handleClick} className="btn-floating waves-effect waves-light deep-purple lighten-1"><i className="material-icons">delete</i></a>
        ) : ""

        return (
            <div className="card event-summary">
                <div className="card-content grey-text text-darken-3">
                    <div className="row">
                        <div className="col s6 m8">
                            <p>{this.props.comment.content}</p>
                            <p className="grey-text">{this.props.comment.author_fname} {this.props.comment.author_lname}</p>
                            <p className="grey-text">{this.props.comment.date}</p>
                        </div>
                        <div className="col s6 m4">
                            {deleteBtn}
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
        event_id: state.event.details.id,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteCommentAction: (id, event_id) => dispatch(deleteCommentAction(id, event_id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment);