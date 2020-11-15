import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const LoginFormLayout = (props) => {
  return (
    <Container style={{ padding: 15 }}>
      <Row className="justify-content-center mx-auto mt-5 p-2">
        <Col sm={4} md={8}>
          <Card className="text-center">
            <Card.Header>ログインフォーム</Card.Header>
            <Card.Body>{props.children}</Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginFormLayout;
