import React, { Component } from 'react'

class CreateComment extends Component {
    state = {
        content: '',
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
            <div className="card">
                <div className="card-content">
                    <h5 className="card-title grey-text text-darken-3">New comment</h5>
                    <form onSubmit={this.handleSubmit} className="white">
                        <div className="input-field">
                            <textarea id="content" className="materialize-textarea" onChange={this.handleChange} />
                        </div>
                        <div className="input-field center">
                            <button className="btn deep-purple lighten-1 waves-effect waves-light">Add comment</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default CreateComment;