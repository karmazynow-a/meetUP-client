import React, {Component} from 'react'
import EventManagerList from '../events/EventManagerList'
import CreateEvent from '../events/CreateEvent'
import {connect} from 'react-redux'
import {getAuthorEventsAction} from '../../store/actions/userReducerActions'
import LoginError from './LoginError'

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

class EventManager extends Component {

    componentDidMount = () => {
        if (this.props.isAuth) {
            this.props.getAuthorEventsAction(this.props.userDetails.id);
        }
    }

    render () {
        return this.props.isAuth ? (
            <div className="container">
                <div className="row">
                    <div className="col s12 m6">
                        <EventManagerList events={this.props.events}/>
                    </div>
                    <div className="col s12 m5 offset-m1">
                        <AddEventSection />
                    </div>
                </div>
            </div>
        ) : <LoginError/>
    }
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.user.isAuth,
        userDetails: state.user.userDetails,
        events: state.user.author_events
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAuthorEventsAction: (id) => dispatch(getAuthorEventsAction(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventManager);