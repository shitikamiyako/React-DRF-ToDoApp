import React from 'react';
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav } from 'react-bootstrap';

const Logged_in_NavbarComponent = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <LinkContainer to="/">
                <Navbar.Brand>Mix up Our Todo</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/todo/top">Task</Nav.Link>
                    <Nav.Link href="/user_group/top">Group</Nav.Link>
                    <Nav.Link href="/user_group/joined">Joined Group</Nav.Link>
                    <Nav.Link href="/user_info">My Page</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link href="/logout">Logout</Nav.Link>
                    <Nav.Link href="/unsubscribe">Unsubscribe</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )

}

export default Logged_in_NavbarComponent