import React from "react";
import GroupForm from "./GroupForm";
import GroupList from "./GroupList";
import { Container, Row, Col } from "react-bootstrap";


const Group = () => {

    const GroupListComponent = React.memo(() => {
        return (
            <GroupList />
        )
    })
    const GroupFormComponent = React.memo(() => {
        return (
            <GroupForm className="mb-3 mt-3"/>
        )
    })


    return (
        <div>
            <Container>
                <Row className="justify-content-center mx-auto mt-3 p-2">
                    <Col sm={12} md={12}>
                        <h3 className="text-center mb-3 mt-3">Add Group</h3>
                        <GroupFormComponent />
                        <h3 className="text-center mb-3 mt-3">Group List</h3>
                        <GroupListComponent />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Group;
