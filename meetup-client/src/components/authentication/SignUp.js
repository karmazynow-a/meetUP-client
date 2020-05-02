import React, { Component } from 'react'
import axios from 'axios';

class SignUp extends Component {
    state = {
        password: '',
        fname: '',
        lname: '',
        email: ''
    }

    handleChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);

        //TODO authenticate
        axios.post("https://alporeba-zti-projekt.eu-gb.mybluemix.net/db/rest/person/", this.state)
            .then(res => {
                console.log(res); 
        })
        
        this.props.setAuth(true);
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
        )
    }
}

export default SignUp;