import React from "react";

import useAuth from "../Hooks/useAuth";

import TopPage_unauthenticated from "./TopPage_unauthenticated"
import TopPage_authenticated from "./TopPage_authenticated"
import { Container,Row } from "react-bootstrap";



const TopPage = () => {

    const { authenticated } = useAuth();


    let TopPage_contents = <TopPage_unauthenticated />

    if (authenticated === true) {
        TopPage_contents = <TopPage_authenticated />

    }



    return (
        <div>
            <Container fluid>
                <Row className="justify-content-center">
                    {TopPage_contents}
                </Row>
            </Container>
        </div>
    );

};

export default TopPage;
