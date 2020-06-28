import React, { Component } from 'react'
import M from 'materialize-css'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'

import LoadingScreen from '../layout/LoadingScreen'
import {authAction} from '../../store/actions/userReducerActions'


class SignIn extends Component {
    state = {
        email: '',
        password: '',
        isLoading: false,
        showErrorMessage: true,
    }

    validateForm = () => {
        var formNotValid = false;

        if (!this.state.email){
            M.toast({html: 'E-mail should not be empty!'});
            formNotValid = true;
        }

        if (!this.state.password){
            M.toast({html: 'Password should not be empty!'});
            formNotValid = true;
        }

        return !formNotValid;
    }

    handleChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();

        if (this.validateForm()){
            this.setState(prevState => ({ 
                ...this.state,
                isLoading: !prevState.isLoading,
                showErrorMessage: true,
            }));

            this.props.authAction(this.state);
        }
    }

    componentDidUpdate = () => {
        if (this.props.isAuth === false && this.state.showErrorMessage) {
            M.toast({html: 'Wrong e-mail or password!'});
            this.setState(prevState => ({ 
                ...this.state,
                isLoading: !prevState.isLoading,
                showErrorMessage: false,
            }));
        }
    }

    render() {
        if (this.props.isAuth) {
            return <Redirect to={{ pathname: '/' }} />
        }
        else {
            return (
                <div>
                    { this.state.isLoading && <LoadingScreen/> }
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
                                                    <input type="text" id="email" onChange={this.handleChange} required/>
                                                </div>
                                                <div className="input-field">
                                                    <i className="material-icons prefix">lock_open</i>
                                                    <label htmlFor="password">Password</label>
                                                    <input type="password" id="password" onChange={this.handleChange} required/>
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