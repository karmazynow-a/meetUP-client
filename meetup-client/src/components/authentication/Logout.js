import { Component } from 'react'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'

import {logoutAction} from '../../store/actions/userReducerActions'

class Logout extends Component {

    componentDidMount = () => {
        this.props.logoutAction()
        this.props.history.push("/")
    }

    render(){
        return null;
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        logoutAction: () => dispatch(logoutAction())
    }
}

export default withRouter(connect(null, mapDispatchToProps)(Logout));