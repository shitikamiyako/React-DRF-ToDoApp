import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import RegisterForm from './RegisterForm'

const RegisterFormLayout = () => {
    return (
        <div>
            <Container style={{ padding: 15 }}>
                <Row className="justify-content-center mx-auto mt-5 p-2">
                    <Col sm={4} md={8}>
                        <Card className="text-center">
                            <Card.Header>会員登録</Card.Header>
                            <Card.Body>
                                <RegisterForm />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default RegisterFormLayout;