import React, { Component } from 'react'
import {connect} from 'react-redux'
import {editEventAction} from '../../store/actions/eventReducerActions'
import moment from 'moment'

class EditEvent extends Component {
    state = {
        name: '',
        date: '',
        time: '',
        key: ''
    }

    componentDidMount = () => {
        this.setState({
            name: this.props.event.name,
            key: this.props.event.key,
            date: moment(this.props.event.date).format("DD:MM:YYYY"),
            time: moment(this.props.event.date).format("HH:MM")
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let date = this.state.date + ' ' + this.state.time

        let event = {
            id: this.props.event.id,
            name: this.state.name, 
            key: this.state.key,
            author_id: this.props.author_id,
            date: date
        }

        this.props.editEventAction(event);
        this.props.edit_done();
    }

    generateKey = (e) => {
        this.setState({
            key: Math.random().toString(36).substring(5),
        })
    }

    render() {
        return (
            <div className="card">
                <div className="card-content center">
                    <h5 className="card-title center grey-text text-darken-3">Edit event</h5>
                    <form onSubmit={this.handleSubmit} className="white">
                        <div className="input-field">
                            <label htmlFor="name" className={(this.state.key === "") ? "" : "active"}>Name</label>
                            <input type="text" id="name" onChange={this.handleChange} value={this.state.name}/>
                        </div>
                        <div className="input-field suffix">
                            <label htmlFor="key" className={(this.state.key === "") ? "" : "active"}>Key</label>
                            <input type="text" id="key" maxLength="8" minLength="5" onChange={this.handleChange} value={this.state.key} />
                            <i className="material-icons" onClick={this.generateKey}>sync</i>
                        </div>
                        <div className="input-field">
                            <label htmlFor="date" className={(this.state.key === "") ? "" : "active"}>Date</label>
                            <input type="date" id="date" onChange={this.handleChange} value={this.state.date} />
                        </div>
                        <div className="input-field">
                            <label htmlFor="time" className={(this.state.key === "") ? "" : "active"}>Hour</label>
                            <input type="time" id="time" onChange={this.handleChange} value={this.state.time} />
                        </div>
                        <div className="input-field">
                            <button className="btn deep-purple lighten-1 waves-effect waves-light">Save</button>
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
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        editEventAction: (event) => dispatch(editEventAction(event))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditEvent);