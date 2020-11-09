import React from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Container, Row, Col } from "react-bootstrap";

import MemberListReadOnly from "./MemberList_Readonly";
import GroupJoin_or_Leave from "./GroupJoin_or_Leave";

var csrftoken = Cookies.get("csrftoken");
console.log(csrftoken);
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.withCredentials = true;

const GroupDetail_Readonly = () => {
  const MemberListReadOnlyComponent = React.memo(() => {
    console.log("render");
    return <MemberListReadOnly />;
  });

  const GroupJoin_or_LeaveComponent = React.memo(() => {
    console.log("render_addTask");
    return <GroupJoin_or_Leave />;
  });

  return (
    <div>
      <Container>
        <Row className="justify-content-center mx-auto mt-3 p-2">
          <Col sm={12} md={12}>
            <h3 className="text-center mb-3 mt-3">Join or Leave Member</h3>
            <GroupJoin_or_LeaveComponent />
            <h3 className="text-center mb-3 mt-3">Member List</h3>
            <MemberListReadOnlyComponent />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default GroupDetail_Readonly;
