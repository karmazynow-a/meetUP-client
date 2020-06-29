import React from 'react'
import {NavLink} from 'react-router-dom'


/**
 * List of navigation links to be displayed when user is logged out.
 */
const SignedOutLinks = () => {
    return (
        <ul className="right">
            <li> <NavLink to='/signin'>Log in</NavLink></li>
            <li> <NavLink to='/signup'>Sign up</NavLink></li>
        </ul>
    )
}


export default SignedOutLinks;