import React from "react";
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import _ from "lodash";

import useSpinner from "../Hooks/useSpinner";
import useFlag from "../Hooks/useFlag";
import useAlert from "../Hooks/useAlert";

import {
  Row,
  Col,
  Toast,
  Form,
  Button,
  ButtonToolbar,
  Modal,
} from "react-bootstrap";
import { AuthUrls } from "../Utils/authUrls";

const GroupEdit = () => {
  // メンバー情報を格納するHook
  const [memberList, setMember] = useState([]);
  const { id } = useParams();
  let history = useHistory();

  const { memberListChange, addMember, MemberListChangeReset } = useFlag();
  const { startProgress, stopProgress } = useSpinner();
  const { createAlert } = useAlert();

  let getMemberList = null;
  const deleteMemberUrl = AuthUrls.DELETE_MEMBER__USER_GROUP + id + "/";

  const pullMemberList = async () => {
    startProgress();
    // 初回レンダー及び最初の10件を取得するためのURL
    if (getMemberList === null) {
      getMemberList = AuthUrls.GET_OR_EDIT_USER_GROUP + id;
    }

    // グループ取得のリクエスト
    try {
      const response = await axios.get(getMemberList);
      console.log(response.data.members);
      const responseMap = response.data.members.map((obj) => {
        return obj;
      });
      console.log(responseMap);
      // グループに関する情報を格納
      const saveMemberList = Object.values(responseMap);
      setMember(saveMemberList);
      createAlert({
        message: "メンバーリストの取得に成功しました",
        type: "success",
      });
    } catch (error) {
      console.log(error);
      createAlert({
        message: "メンバーリストの取得に失敗しました",
        type: "danger",
      });
    } finally {
      stopProgress();
    }
  };

  const memberDelete = async (member_name) => {
    const username = member_name;
    const data = {
      id: id,
      username: username,
    };
    try {
      const response = await axios.patch(deleteMemberUrl, data);
      console.log(response.data.members);
      createAlert({
        message: "メンバーの削除に成功しました",
        type: "success",
      });
        addMember()
    } catch (error) {
      console.log(error);
      createAlert({
        message: "メンバーの削除に失敗しました",
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
      <Row className="groupList">
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
                  <Button
                    variant="outline-danger"
                    className="mr-2"
                    onClick={() => {
                      memberDelete(`${member.username}`);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </Toast.Body>
            </Toast>
          </Col>
        ))}
      </Row>

      <Button
        variant="success"
        className="mr-2"
        onClick={() => history.push(`/`)}
      >
        Go Back Top
      </Button>
    </div>
  );
};

export default GroupEdit;
