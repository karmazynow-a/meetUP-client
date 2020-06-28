import React from 'react'
import {NavLink} from 'react-router-dom'


const SignedInLinks = () => {
    return (
        <ul className="right">
            <li> <NavLink to='/'>Dashboard</NavLink></li>
            <li> <NavLink to='/manage'>Manage Events</NavLink></li>
            <li> <NavLink to='/account'>Account</NavLink></li>
            <li> <NavLink to='/logout'>Log out</NavLink></li>
        </ul>
    )
}


export default SignedInLinks;