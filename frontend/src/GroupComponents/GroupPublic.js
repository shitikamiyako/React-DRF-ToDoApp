import React from "react";
import GroupListReadonly from "./GroupList_Readonly";

import { Container, Row, Col } from "react-bootstrap";

const GroupReadOnly = () => {
  const GroupListReadOnlyComponent = React.memo(() => {
    return <GroupListReadonly />;
  });

  return (
    <div>
      <Container>
        <Row className="justify-content-center mx-auto mt-3 p-2">
          <Col sm={12} md={12}>
            <h3 className="text-center mb-3 mt-3">Group List</h3>
            <GroupListReadOnlyComponent />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default GroupReadOnly;
