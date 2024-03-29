import React, { Component } from 'react'
import {connect} from 'react-redux'

import EditEvent from './EditEvent'
import {deleteEventAction} from '../../../store/actions/eventReducerActions'


/**
 * Component to display single event in organizator mode. Event can be edited
 * or deleted.
 */
class ManageEvent extends Component {
    state = {
        showForm: false,
    }

    handleEdit = (e) => {
        this.setState({
            ...this.state,
            showForm: true
        })
    }

    handleDelete = (e) => {
        this.props.deleteEventAction(this.props.event.id, this.props.author_id);
    }

    edit_done = () => {
        this.setState({
            ...this.state,
            showForm: false
        });
    }

    render(){
        return this.state.showForm ?
            (<EditEvent event={this.props.event} edit_done={this.edit_done}/>) : (
                <div className="card event-summary">
                    <div className="card-content grey-text text-darken-3">
                        <div className="row">
                            <div className="col s12 m8">
                                <span className="card-title">{this.props.event.name}</span>
                                <p className="grey-text">{this.props.event.key}</p>
                                <p className="grey-text">{this.props.event.date}</p>
                            </div>
                            <div className="col s12 m1">
                                <div className="input-field">
                                    <a onClick={this.handleEdit} className="btn-floating waves-effect waves-light deep-purple lighten-1"><i className="material-icons">edit</i></a>
                                </div>
                                <div className="input-field">
                                    <a onClick={this.handleDelete} className="btn-floating waves-effect waves-light deep-purple lighten-1"><i className="material-icons">delete</i></a>
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
        author_id: state.user.userDetails.id,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteEventAction: (id, author_id) => dispatch(deleteEventAction(id, author_id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageEvent);