import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Button } from "react-bootstrap";


const Landing_unauthenticated = () => {

    return (
        <div>
            <h1>Welcome to this Site. Please Login or Register</h1>

            <LinkContainer to={`/login`}>
                <Button variant="primary">Login</Button>
            </LinkContainer>

            <LinkContainer to={`/signup`}>
                <Button variant="success">Register</Button>
            </LinkContainer>
        </div>
    );

};

export default Landing_unauthenticated;
