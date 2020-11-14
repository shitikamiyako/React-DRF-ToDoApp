import React from "react";
import axios from "axios";

import { useParams } from "react-router-dom";

import { Button, ButtonToolbar } from "react-bootstrap";

import useSpinner from "../Hooks/useSpinner";
import useAlert from "../Hooks/useAlert";
import useFlag from "../Hooks/useFlag";
import { AuthUrls } from "../Utils/authUrls";

const Join_or_Leave = () => {
  const { startProgress, stopProgress } = useSpinner();
  const { createAlert } = useAlert();
  const { addMember } = useFlag();
  const { id } = useParams();
  const joinGroupUrl = AuthUrls.JOIN_USER_GROUP + id + "/";
  const leaveGroupUrl = AuthUrls.LEAVE_USER_GROUP + id + "/";

  const join_Group = async () => {
    startProgress();
    const data = {
      id: id,
    };

    try {
      const response = await axios.post(joinGroupUrl, data);
      console.log(response);
      createAlert({
        message: "グループに加入しました",
        type: "success",
      });
      addMember();
    } catch (error) {
      console.log(error);
      createAlert({
        message: "グループの加入に失敗しました",
        type: "danger",
      });
    } finally {
      stopProgress();
    }
  };

  const onClickJoin = async () => {
    join_Group();
  };

  const leave_Group = async () => {
    startProgress();
    const data = {
      id: id,
    };

    try {
      const response = await axios.patch(leaveGroupUrl, data);
      console.log(response);
      createAlert({
        message: "グループから脱退しました",
        type: "success",
      });
      addMember();
    } catch (error) {
      console.log(error);
      createAlert({
        message: "グループの脱退に失敗しました",
        type: "danger",
      });
    } finally {
      stopProgress();
    }
  };

  const onClickLeave = async () => {
    leave_Group();
  };

  return (
    <ButtonToolbar className="justify-content-center">
      <Button
        className="mr-2"
        variant={"primary"}
        type="submit"
        onClick={() => {
          onClickJoin();
        }}
      >
        Join Group
      </Button>

      <Button
        variant={"danger"}
        type="submit"
        onClick={() => {
          onClickLeave();
        }}
      >
        Leave Group
      </Button>
    </ButtonToolbar>
  );
};

export default Join_or_Leave;
