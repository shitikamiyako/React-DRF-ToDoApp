import React from "react";
import { useHistory } from "react-router-dom";

import UserInfoChangeForm from "./UserInfoChangeForm";
import { Container, Button, Col } from "react-bootstrap";

const UserPage = () => {
  const history = useHistory();
  const UserInfoChangeFormComponent = React.memo(() => {
    return <UserInfoChangeForm />;
  });

  return (
    <div className="UserInfoForm">
      <Container style={{ padding: 15 }}>
        <Col sm={12} md={12} className="text-center">
          <h3 className="text-center mb-3 mt-3">User Info</h3>
          <p>
            ＊変更したくない項目はフォームの内容を変更せずにボタンを押してください
          </p>
        </Col>
        <UserInfoChangeFormComponent />
        <div className="UserInfoButton">
          <Button
            className="mr-2"
            variant="success"
            size="sm"
            type="submit"
            onClick={() => history.push(`/password_change`)}
          >
            Go Password Change
          </Button>
          <Button
            variant="danger"
            size="sm"
            type="submit"
            onClick={() => history.push(`/unsubscribe`)}
          >
            Want to unsubscribe?{" "}
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default UserPage;
