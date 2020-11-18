import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import MemberList from "./MemberList";
import MemberAddForm from "./MemberAddForm";

const GroupEdit = () => {
  const MemberListComponent = React.memo(() => {
    return <MemberList />;
  });

  const AddMemberComponent = React.memo(() => {
    return <MemberAddForm />;
  });

  return (
    <div>
      <Container>
        <Row className="justify-content-center mx-auto mt-3 p-2">
          <Col sm={12} md={12}>
            <h3 className="text-center mb-3 mt-3">Add Member</h3>
            <AddMemberComponent />
            <h3 className="text-center mb-3 mt-3">Member List</h3>
            <MemberListComponent />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default GroupEdit;
