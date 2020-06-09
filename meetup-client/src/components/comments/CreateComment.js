import React, { Component } from 'react'
import {connect} from 'react-redux'
import {addCommAction} from '../../store/actions/eventReducerActions'
import moment from 'moment'


class CreateComment extends Component {
    state = {
        content: '',
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();

        let comment = {
            author_id: this.props.author_id,
            event_id: this.props.event_id,
            content: this.state.content,
            date: moment().format("YYYY-MM-DD hh:mm:ss")
        }

        this.props.addCommAction(comment);
        this.props.comment_done();
    }

    render() {
        return (
            <div className="card">
                <div className="card-content">
                    <h5 className="card-title grey-text text-darken-3">New comment</h5>
                    <form onSubmit={this.handleSubmit} className="white">
                        <div className="input-field">
                            <textarea id="content" className="materialize-textarea" onChange={this.handleChange} />
                        </div>
                        <div className="input-field center">
                            <button className="btn deep-purple lighten-1 waves-effect waves-light">Add comment</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        author_id: state.user.userDetails.id,
        event_id: state.event.details.id
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addCommAction: (comment) => dispatch(addCommAction(comment))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateComment);