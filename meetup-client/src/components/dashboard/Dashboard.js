import React, {Component} from 'react'
import EventList from '../events/EventList'
import FindEvent from '../events/FindEvent'

class Dashboard extends Component {
    render(){
        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m6">
                        <EventList/>
                    </div>
                    <div className="col s12 m5 offset-m1">
                        <FindEvent/>
                    </div>
                </div>
            </div>
        )
    }

}

export default Dashboard;