import React, { Component } from 'react'
import {connect} from 'react-redux'
import {authAction} from '../../store/actions/userReducerActions'

class SignIn extends Component {
    state = {
        email: '',
        password: '',
    }

    handleChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.props.authAction(this.state);
        
        this.props.history.push("/");
    }

    render() {
        if (this.props.isAuth) { this.props.history.push("/") }
        else {
            return (
                <div className="container">
                    <div className="section">
                        <div className="row">
                            <div className="col s12 m6 offset-m3">
                                <div className="card">
                                    <div className="card-content  center">
                                        <h5 className="card-title center grey-text text-darken-3">Log In</h5>
                                        <form onSubmit={this.handleSubmit} className="white">
                                            <div className="input-field">
                                                <i className="material-icons prefix">account_circle</i>
                                                <label htmlFor="email">E-mail</label>
                                                <input type="text" id="email" onChange={this.handleChange} />
                                            </div>
                                            <div className="input-field">
                                                <i className="material-icons prefix">lock_open</i>
                                                <label htmlFor="password">Password</label>
                                                <input type="text" id="password" onChange={this.handleChange} />
                                            </div>
                                            <div className="input-field">
                                                <button className="btn deep-purple lighten-1 waves-effect waves-light">Login</button>
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
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.user.isAuth,
        userDetails: state.user.userDetails
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        authAction: (credentials) => dispatch(authAction(credentials))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);