import React, { Component } from 'react'
import {connect} from 'react-redux'
import {findEventAction, joinEventAction} from '../../store/actions/eventReducerActions'

class FindEvent extends Component {
    state = {
        key: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);

        this.props.findEventAction(this.state.key);
    }

    handleJoin = (e) => {
        e.preventDefault();
        console.log(this.props);
        joinEventAction(this.props.event_details.id, this.props.user_id)
    }

    render() {
        // FIX ME after event details will return the author_id
        let joinBtn = (this.props.user_id === this.props.event_details.author_id) ? (
            <div className="input-field center">
                <button onClick={this.handleJoin} className="btn deep-purple lighten-1 waves-effect waves-light">JOIN</button>
            </div>
        ) : "";

        let resultCard = this.props.key_found ? (
            <div className="card">
                <div className="card-content">
                    <h5 className="card-title grey-text text-darken-3">{this.props.event_details.name}</h5>
                    <p>{this.props.event_details.author_fname} {this.props.event_details.author_lname}</p>
                    <p className="grey-text">{this.props.event_details.date}</p>
                    {joinBtn}
                </div>
            </div>
        ) : "";

        return (
            <div className="section">
                <div className="card">
                    <div className="card-content">
                        <h5 className="card-title grey-text text-darken-3">Find event</h5>
                        <form onSubmit={this.handleSubmit} className="white">
                            <div className="input-field">
                                <i className="material-icons prefix">search</i>
                                <input type="text" id="key" onChange={this.handleChange} />
                            </div>
                            <div className="input-field center">
                                <button className="btn deep-purple lighten-1 waves-effect waves-light">Find</button>
                            </div>
                        </form>
                    </div>
                </div>
                {resultCard}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        event_details: state.event.details,
        user_id: state.user.userDetails.id,
        key_found: state.event.isLatestKeyFound,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        findEventAction: (key) => dispatch(findEventAction(key)),
        joinEventAction: (event_id, person_id) => dispatch(joinEventAction(event_id, person_id))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FindEvent);