import React from 'react';
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav} from 'react-bootstrap';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const FooterComponent = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <LinkContainer to="/">
                <Navbar.Brand>Mix up Our Todo</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <p className="text-center mt-2 mr-2 copy-right">Copyright 2020 shitika Miyako</p>
                </Nav>
                <Nav className="mr-auto">
                    <Nav.Link href="https://twitter.com/shitikamiyako"><FontAwesomeIcon icon={faTwitter} /></Nav.Link>
                    <Nav.Link href="https://github.com/shitikamiyako"><FontAwesomeIcon icon={faGithub} /></Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )

}

export default FooterComponent