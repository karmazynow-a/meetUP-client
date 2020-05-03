import React, { Component } from 'react'
import {connect} from 'react-redux'
import {editUserAction} from '../../store/actions/userReducerActions'


class EditAccount extends Component {
    state = {
        password: '',
        fname: '',
        lname: '',
        email: ''
    }

    componentDidMount = () => {
        this.setState({
            ...this.state,
            fname: this.props.person.fname,
            lname: this.props.person.lname
        })
    }

    handleChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.props.editUserAction(this.state)
        this.props.history.push("/");
    }

    render() {
        return (
            <div className="container">
                <div className="section">
                    <div className="row">
                        <div className="col s12 m6 offset-m3">
                            <div className="card">
                                <div className="card-content  center">
                                    <h5 className="card-title center grey-text text-darken-3">Edit Account Details</h5>
                                    <form onSubmit={this.handleSubmit} className="white">
                                        <div className="input-field">
                                            <label className={(this.state.fname === "") ? "" : "active"} htmlFor="fname">First name</label>
                                            <input type="text" id="fname" onChange={this.handleChange} value={this.state.fname} required/>
                                        </div>
                                        <div className="input-field">
                                            <label className={(this.state.lname === "") ? "" : "active"} htmlFor="lname">Last name</label>
                                            <input type="text" id="lname" onChange={this.handleChange} value={this.state.lname} required/>
                                        </div>
                                        <div className="input-field">
                                            <label htmlFor="password">Password</label>
                                            <input type="password" id="password" onChange={this.handleChange} required/>
                                        </div>
                                        <div className="input-field">
                                            <button className="btn deep-purple lighten-1 waves-effect waves-light">Save</button>
                                        </div>
                                    </form>
                                </div>
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
       person: state.user.userDetails,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        editUserAction: (credentials) => dispatch(editUserAction(credentials))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditAccount);