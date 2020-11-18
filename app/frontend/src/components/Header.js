import React from 'react';

import useAuth from "../Hooks/useAuth";

import LoggedNavbar from './Logged_in_Navbar'
import UnLoggedNavbar from './UnLogged_in_Navbar'


const NavbarComponent = () => {

    const { authenticated } = useAuth();
    let NavbarContent = <UnLoggedNavbar />

    if (authenticated === true) {
        NavbarContent = <LoggedNavbar />

    }

    return (
        <header>
            {NavbarContent}
        </header>

    )

}

export default NavbarComponent