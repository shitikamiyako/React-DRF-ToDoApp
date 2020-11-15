import React from "react";
import { useHistory } from "react-router-dom";

import ChangePasswordForm from "./ChangePasswordForm";
import { Container, Button, Col } from "react-bootstrap";

const ChangePassword = () => {
  const history = useHistory();
  const ChangePasswordFormComponent = React.memo(() => {
    return <ChangePasswordForm />;
  });

  return (
    <div className="UserInfoForm">
      <Container style={{ padding: 15 }}>
        <Col sm={12} md={12}>
          <h3 className="text-center mb-3 mt-3">パスワード変更</h3>
        </Col>
        <ChangePasswordFormComponent />
        <div className="UserInfoButton">
          <Button
            variant="success"
            type="submit"
            onClick={() => history.push(`/user_info`)}
          >
            Go Back UserInfo
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default ChangePassword;
