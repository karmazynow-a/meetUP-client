import React, { Component } from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

import {editEventAction} from '../../../store/actions/eventReducerActions'


/**
 * Component to edit event details, like date, key and name.
 * Similar to CreateEvent there are random key generator and date picker.
 */
class EditEvent extends Component {
    state = {
        name: '',
        date: '',
        key: '',
    }

    componentDidMount = () => {
        var formattedDate = moment(this.props.event.date, 'DD-MM-YYYY HH:mm').toDate();
        this.setState({
            name: this.props.event.name,
            key: this.props.event.key,
            date: formattedDate,
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleDateChange = (date) => {
        this.setState({
            ...this.state,
            date
        })
    }


    handleSubmit = (e) => {
        e.preventDefault();
        var formatedDate = moment(this.state.date).format("DD-MM-YYYY HH:mm")

        let event = {
            id: this.props.event.id,
            name: this.state.name, 
            key: this.state.key,
            author_id: this.props.author_id,
            date: formatedDate
        }

        this.props.editEventAction(event);
        this.props.edit_done();
    }

    generateKey = () => {
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
                            <label htmlFor="name" className={(this.state.name === "") ? "" : "active"}>Name</label>
                            <input type="text" id="name" onChange={this.handleChange} value={this.state.name}/>
                        </div>
                        <div className="input-field suffix">
                            <label htmlFor="key" className={(this.state.key === "") ? "" : "active"}>Key</label>
                            <input type="text" id="key" maxLength="8" minLength="5" onChange={this.handleChange} value={this.state.key} />
                            <i className="material-icons" onClick={this.generateKey}>sync</i>
                        </div>
                        <div className="input-field">
                            <label htmlFor="date" className={(this.state.date === "") ? "" : "active"}>Date</label>
                            <DatePicker id="date" onChange={this.handleDateChange} selected={this.state.date} showTimeSelect timeFormat="HH:mm"
                                    timeIntervals={15} timeCaption="time" dateFormat="dd-MM-yyyy HH:mm"/>
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