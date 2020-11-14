import React from "react";
import GroupJoinedList from "./GroupJoinedList";
import { Container, Row, Col } from "react-bootstrap";


const GroupJoined = () => {

    const GroupJoinedListComponent = React.memo(() => {
        return (
            <GroupJoinedList />
        )
    })


    return (
        <div>
            <Container>
                <Row className="justify-content-center mx-auto mt-3 p-2">
                    <Col sm={12} md={12}>
                        <h3 className="text-center mb-3 mt-3">Your Joined Group List</h3>
                        <GroupJoinedListComponent />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default GroupJoined;
