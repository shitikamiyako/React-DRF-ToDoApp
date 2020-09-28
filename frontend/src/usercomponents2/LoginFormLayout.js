import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const LoginFormLayout = (props) => {
  return (
    <div>
      <Container style={{ padding: 15 }}>
        <Row>
          <Col sm={10}>
            {props.children}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginFormLayout;
