import React from 'react'
import {NavLink} from 'react-router-dom'

const SignedInLinks = () => {
    return (
        <ul className="right">
            <li> <NavLink to='/'>Dashboard</NavLink></li>
            <li> <NavLink to='/manage'>Manage Events</NavLink></li>
            <li> <NavLink to='/'>Log out</NavLink></li>
        </ul>
    )
}


export default SignedInLinks;