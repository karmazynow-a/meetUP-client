import React, { Component } from 'react'
import M from 'materialize-css';
import {connect} from 'react-redux'
import {signupAction} from '../../store/actions/userReducerActions'
import LoadingScreen from '../layout/LoadingScreen'
import { Redirect } from 'react-router-dom'

class SignUp extends Component {
    state = {
        password: '',
        fname: '',
        lname: '',
        email: '',
        isLoading: false,
    }

    validateForm = () => {
        var formNotValid = false;

        if (!this.state.email){
            M.toast({html: 'E-mail should not be empty!'});
            formNotValid = true;
        }

        if (!this.state.fname){
            M.toast({html: 'First name should not be empty!'});
            formNotValid = true;
        }

        if (!this.state.lname){
            M.toast({html: 'Last name should not be empty!'});
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

            this.props.signupAction(this.state);
        }
    }

    render() {
        if (this.props.isAuth) {
            return <Redirect to={{ pathname: '/' }} />
        }
        return (
            <div>
                { this.state.isLoading && <LoadingScreen/> }
                <div className="container">
                    <div className="section">
                        <div className="row">
                            <div className="col s12 m6 offset-m3">
                                <div className="card">
                                    <div className="card-content  center">
                                        <h5 className="card-title center grey-text text-darken-3">Sign Up</h5>
                                        <form onSubmit={this.handleSubmit} className="white">
                                            <div className="input-field">
                                                <label htmlFor="fname">First name</label>
                                                <input type="text" id="fname" onChange={this.handleChange} />
                                            </div>
                                            <div className="input-field">
                                                <label htmlFor="lname">Last name</label>
                                                <input type="text" id="lname" onChange={this.handleChange} />
                                            </div>
                                            <div className="input-field">
                                                <label htmlFor="email">E-mail</label>
                                                <input type="email" id="email" onChange={this.handleChange} />
                                            </div>
                                            <div className="input-field">
                                                <label htmlFor="password">Password</label>
                                                <input type="password" id="password" onChange={this.handleChange} />
                                            </div>
                                            <div className="input-field">
                                                <button className="btn deep-purple lighten-1 waves-effect waves-light">Create account</button>
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

const mapStateToProps = (state) => {
    return {
        isAuth: state.user.isAuth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signupAction: (credentials) => dispatch(signupAction(credentials))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);