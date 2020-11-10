import React from 'react';

import useAuth from "../Hooks/useAuth";

import Logged_in_Navbar from './Logged_in_Navbar'
import UnLogged_in_Navbar from './UnLogged_in_Navbar'

const NavbarComponent = () => {

    const { authenticated } = useAuth();
    let NavbarContent = <UnLogged_in_Navbar />

    if (authenticated === true) {
        NavbarContent = <Logged_in_Navbar />

    }

    return (
        <div>
            {NavbarContent}
        </div>
    )

}

export default NavbarComponent