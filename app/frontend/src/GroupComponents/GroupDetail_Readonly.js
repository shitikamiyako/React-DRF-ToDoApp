import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import MemberListReadOnly from "./MemberList_Readonly";
import GroupJoinLeave from "./GroupJoin_or_Leave";


const GroupDetail_Readonly = () => {
  const MemberListReadOnlyComponent = React.memo(() => {
    return <MemberListReadOnly />;
  });

  const GroupJoinLeaveComponent = React.memo(() => {
    return <GroupJoinLeave />;
  });

  return (
    <div>
      <Container>
        <Row className="justify-content-center mx-auto mt-3 p-2">
          <Col sm={12} md={12}>
            <h3 className="text-center mb-3 mt-3">Join or Leave Member</h3>
            <GroupJoinLeaveComponent />
            <h3 className="text-center mb-3 mt-3">Member List</h3>
            <MemberListReadOnlyComponent />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default GroupDetail_Readonly;
