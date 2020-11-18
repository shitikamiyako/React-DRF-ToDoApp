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
                    <LinkContainer to="/todo/top">
                        <Nav.Link>Task</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/user_group/top">
                        <Nav.Link>Group</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/user_group/joined">
                        <Nav.Link>Joined Group</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/user_info">
                        <Nav.Link>My Page</Nav.Link>
                    </LinkContainer>
                </Nav>
                <Nav>
                    <LinkContainer to="/logout">
                        <Nav.Link>Logout</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/unsubscribe">
                        <Nav.Link>Unsubscribe</Nav.Link>
                    </LinkContainer>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )

}

export default Logged_in_NavbarComponent