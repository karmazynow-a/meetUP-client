import React from 'react'
import {Link} from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'


const Navbar = () => {
    return (
        <div class="navbar-fixed">
            <nav className="nav-wrapper teal lighten-1">
                <div className="container">
                    <Link to='/' className="brand-logo">MeetUP <i className="large material-icons">assignment_ind</i> </Link>
                    <SignedInLinks/>
                    <SignedOutLinks/>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;