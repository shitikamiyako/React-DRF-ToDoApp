import React from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Container, Row, Col } from "react-bootstrap";

import MemberList from "./MemberList";
import MemberAddForm from "./MemberAddForm";

var csrftoken = Cookies.get("csrftoken");
console.log(csrftoken);
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.withCredentials = true;

const GroupEdit = () => {
  const MemberListComponent = React.memo(() => {
    console.log("render");
    return <MemberList />;
  });

  const addMemberComponent = React.memo(() => {
    console.log("render_addTask");
    return <MemberAddForm />;
  });

  return (
    <div>
      <Container>
        <Row className="justify-content-center mx-auto mt-3 p-2">
          <Col sm={12} md={12}>
            <h3 className="text-center mb-3 mt-3">Add Member</h3>
            <MemberAddForm />
            <h3 className="text-center mb-3 mt-3">Member List</h3>
            <MemberListComponent />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default GroupEdit;
