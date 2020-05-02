import React, { Component } from 'react'
import {connect} from 'react-redux'
import deleteEventAction from '../../store/actions/eventReducerActions'
import EditEvent from './EditEvent'

class ManageEvent extends Component {
    state = {
        showForm: false,
    }

    handleEdit = (e) => {
        console.log('edit', this.props.event.id);
        this.setState({
            ...this.state,
            showForm: true
        })
    }

    handleDelete = (e) => {
        //this.props.deleteEventAction(this.props.event.id);
        console.log('delete', this.props.event.id);
    }

    render(){
        return (
            <div>
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

                { this.state.showForm ? <EditEvent event={this.props.event}/> : "" }
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteEventAction: (id) => dispatch(deleteEventAction(id))
    }
}

export default connect(null, mapDispatchToProps)(ManageEvent);