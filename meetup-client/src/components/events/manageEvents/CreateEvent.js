import React, { Component } from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
import M from 'materialize-css'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

import {addEventAction} from '../../../store/actions/eventReducerActions'


class CreateEvent extends Component {
    state = {
        name: '',
        date: '',
        key: ''
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

        var eventDate = moment(this.state.date);

        if (eventDate <= moment()){
            M.toast({html: 'Date is invalid!'});
        } else {
            var formatedDate = eventDate.format("DD-MM-YYYY HH:mm")
            let event = {
                name: this.state.name, 
                key: this.state.key,
                author_id: this.props.author_id,
                date: formatedDate
            }
    
            this.props.addEventAction(event);
            this.props.close_form();
        }
    }

    generateKey = (e) => {
        this.setState({
            key: Math.random().toString(36).substring(5),
        })
    }

    render() {
        console.log("date", this.state.date);
        return (
            <div className="card">
                <div className="card-content center">
                    <h5 className="card-title center grey-text text-darken-3">New event</h5>
                    <form onSubmit={this.handleSubmit} className="white">
                        <div className="input-field">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" onChange={this.handleChange} />
                        </div>
                        <div className="input-field suffix">
                            <label htmlFor="key" className={(this.state.key === "") ? "" : "active"}>Key</label>
                            <input type="text" id="key" maxLength="8" minLength="5" onChange={this.handleChange} value={this.state.key} />
                            <i className="material-icons" onClick={this.generateKey}>sync</i>
                        </div>
                        <div className="input-field">
                            <label htmlFor="date">Date</label>
                            <DatePicker id="date" onChange={this.handleDateChange} selected={this.state.date} showTimeSelect timeFormat="HH:mm"
                                    timeIntervals={15} timeCaption="time" dateFormat="dd MM yyyy HH:mm"/>
                        </div>
                        <div className="input-field">
                            <button className="btn deep-purple lighten-1 waves-effect waves-light">Create event</button>
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
        addEventAction: (event) => dispatch(addEventAction(event))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent);