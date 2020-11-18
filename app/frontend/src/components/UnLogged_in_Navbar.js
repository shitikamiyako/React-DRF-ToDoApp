import React from 'react';
import { LinkContainer } from 'react-router-bootstrap'

import { Navbar, Nav } from 'react-bootstrap';

const UnLogged_in_NavbarComponent = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <LinkContainer to="/">
                <Navbar.Brand>Mix up Our Todo</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link href="/login">Login</Nav.Link>
                    <Nav.Link href="/signup">Sign Up</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )

}

export default UnLogged_in_NavbarComponent