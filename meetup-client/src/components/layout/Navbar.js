import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'


const Navbar = ({isAuth}) => {
    return (
        <div className="navbar-fixed">
            <nav className="nav-wrapper teal lighten-1">
                <div className="container">
                    <Link to='/' className="left brand-logo">MeetUP <i className="large material-icons">assignment_ind</i> </Link>
                    { isAuth ? <SignedInLinks/> : <SignedOutLinks/> }
                </div>
            </nav>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.user.isAuth,
    }
}

export default connect(mapStateToProps)(Navbar);