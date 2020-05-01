import React, { Component } from 'react'

class CreateComment extends Component {
    state = {
        key: '',
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
    }

    render() {
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
            </div>
        )
    }
}

export default CreateComment;