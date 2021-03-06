import React from "react";
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

import useSpinner from "../Hooks/useSpinner";
import useFlag from "../Hooks/useFlag";
import useAlert from "../Hooks/useAlert";

import {
  Row,
  Col,
  Toast,
  Button,
} from "react-bootstrap";
import { AuthUrls } from "../Utils/authUrls";

const MemberListReadOnly = () => {
  // メンバー情報を格納するHook
  const [memberList, setMember] = useState([]);
  const { id } = useParams();
  let history = useHistory();
  // カスタムHooks
  const { memberListChange, MemberListChangeReset } = useFlag();
  const { startProgress, stopProgress } = useSpinner();
  const { createAlert } = useAlert();

  let getMemberReadOnlyListUrl = null;

  const pullMemberList = async () => {
    startProgress();
    // 初回レンダー及び最初の10件を取得するためのURL
    if (getMemberReadOnlyListUrl === null) {
      getMemberReadOnlyListUrl = AuthUrls.GET_READONLY_USER_GROUP + id;
    }

    // グループ取得のリクエスト
    try {
      const response = await axios.get(getMemberReadOnlyListUrl);
      const responseMap = response.data.members.map((obj) => {
        return obj;
      });
      // グループに関する情報を格納
      const saveMemberList = Object.values(responseMap);
      setMember(saveMemberList);
      createAlert({
        message: "メンバーリストの取得に成功しました",
        type: "success",
      });
    } catch (error) {
      createAlert({
        message: "メンバーリストの取得に失敗しました",
        type: "danger",
      });
    } finally {
      stopProgress();
    }
  };

  useEffect(() => {
    pullMemberList();
    MemberListChangeReset();
  }, [memberListChange]);

  return (
    <div>
      <Row className="memberList">
        {memberList.map((member, index) => (
          <Col xs={12} sm={12} md={6} key={index}>
            <Toast className="justify-content-center mb-3">
              <Toast.Header closeButton={false}>
                <strong className="mr-auto">{member.username}</strong>
              </Toast.Header>
              <Toast.Body className="text-align-center">
                <div className="memberButton">
                  <Button
                    variant="outline-success"
                    className="mr-2"
                    onClick={() =>
                      history.push(`/todo/list/${member.username}`)
                    }
                  >
                    Go Task
                  </Button>
                </div>
              </Toast.Body>
            </Toast>
          </Col>
        ))}
      </Row>

      <Button
        variant="success"
        className="mr-2 content-end-button"
        onClick={() => history.push(`/`)}
      >
        Go Back Top
      </Button>
    </div>
  );
};

export default MemberListReadOnly;
