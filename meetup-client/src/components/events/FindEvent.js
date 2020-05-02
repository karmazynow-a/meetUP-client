import React, { Component } from 'react'
import {connect} from 'react-redux'

class FindEvent extends Component {
    state = {
        key: '',
        isFound: false,
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);

        //reducer findEventAction(this.state.key)

        this.setState({
            ...this.state,
            isFound: true,
        })
    }

    handleJoin = (e) => {
        e.preventDefault();
        //reducer joinEventAction(this.props.event_details.id, this.props.user_id)
    }

    render() {
        let resultCard = this.state.isFound ? (
            <div className="card">
                <div className="card-content">
                    <h5 className="card-title grey-text text-darken-3">{this.props.event_details.name}</h5>
                    <p>{this.props.event_details.author_fname} {this.props.event_details.author_lname}</p>
                    <p className="grey-text">{this.props.event_details.date}</p>
                    <form onSubmit={this.handleJoin} className="white">
                        <div className="input-field center">
                            <button className="btn deep-purple lighten-1 waves-effect waves-light">JOIN</button>
                        </div>
                    </form>
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
        user_id: state.user.userDetails.id
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FindEvent);