import React from "react";

import useAuth from "../Hooks/useAuth";

import TopPageUnauthenticated from "./TopPage_unauthenticated"
import TopPageAuthenticated from "./TopPage_authenticated"
import { Container,Row } from "react-bootstrap";



const TopPage = () => {

    const { authenticated } = useAuth();


    let TopPage_contents = <TopPageUnauthenticated />

    if (authenticated === true) {
        TopPage_contents = <TopPageAuthenticated />

    }



    return (
            <Container fluid className="inner">
                <Row className="justify-content-center">
                    {TopPage_contents}
                </Row>
            </Container>
    );

};

export default TopPage;
