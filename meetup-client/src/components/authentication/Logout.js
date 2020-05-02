import { Component } from 'react'
import {connect} from 'react-redux'
import {logoutAction} from '../../store/actions/userReducerActions'

class Logout extends Component {
    render(){
        this.props.logoutAction();
        this.props.history.push("/");
        return null;
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        logoutAction: () => dispatch(logoutAction())
    }
}

export default connect(null, mapDispatchToProps)(Logout);