import React, {Component} from 'react'
import EventManagerList from '../events/EventManagerList'
import CreateEvent from '../events/CreateEvent'

class AddEventSection extends Component {
    state = {
        createFormVisible: false,
    }

    handleClick = () => {
        this.setState({
            ...this.state,
            createFormVisible: ~this.state.createFormVisible,
        });
    }

    render() {
        return (
            <div className="section">
                <div className="card">
                    <div className="card-content grey-text text-darken-3">
                        <div className="row">
                            <div className="col s6 m8">
                                <span className="card-title">Add event</span>
                            </div>
                            <div className="col s6 m4">
                                <a className="btn-floating waves-effect waves-light deep-purple lighten-1" onClick={this.handleClick}><i className="material-icons">add</i></a>
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.createFormVisible ? <CreateEvent /> : ''}

            </div>
        )

    }

}

const EventManager  = () => {
        return (
            <div className="container">
                <div className="row">
                    <div className="col s12 m6">
                        <EventManagerList />
                    </div>
                    <div className="col s12 m5 offset-m1">
                        <AddEventSection />
                    </div>
                </div>
            </div>
        )

}

export default EventManager;