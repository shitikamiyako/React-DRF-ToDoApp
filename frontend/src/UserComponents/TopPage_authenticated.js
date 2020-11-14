import React from "react";
import { useHistory } from "react-router-dom";
import _ from "lodash";
import axios from "axios";
import { useState, useEffect } from "react";
import { Button, Col } from "react-bootstrap";

import useUser from "../Hooks/useUser";
import useAlert from "../Hooks/useAlert";
import useFlag from "../Hooks/useFlag";
import SearchUser from "./SearchUser";

import { AuthUrls } from "../Utils/authUrls";

const TopPage_authenticated = () => {
  const history = useHistory();
  const [loginUser, setUser] = useState();

  const { createAlert } = useAlert();
  const { getUserList, resetUserList, users } = useUser();
  const { userListChange, UserListChangeReset } = useFlag();

    const SearchUserComponent = React.memo(() => {
        return (
            <SearchUser />
        )
    })

  const get_user_ListUrl = AuthUrls.GET_USER_LIST_RANDOM;
  const get_userUrl = AuthUrls.GET_USER_DATA;

  const pullUserList = async () => {
    resetUserList();

    try {
      const response = await axios.get(get_user_ListUrl);
      const responseMap = response.data.results.map((obj) => {
        return obj;
      });
      const responseData = _.mapKeys(responseMap, "id");
      getUserList(responseData);
    } catch (error) {
      createAlert({
        message: "ユーザーの取得に失敗しました、ログインし直してみてください。",
        type: "danger",
      });
    }

    try {
      const response = await axios.get(get_userUrl);
      setUser(response.data.username);
    } catch (error) {
      createAlert({
        message: "セッションタイムアウトです、ログインし直してみてください。",
        type: "danger",
      });
    }
  };

  const UserList = Object.values(users);

  // useEffect
  useEffect(() => {
    pullUserList();
    UserListChangeReset();
    // return pullTaskList;
  }, [userListChange]);

  return (
    <div>
      {/* タイトル */}
      <h2 className="text-center mb-3 mt-3 user-top-title">Welcome! {loginUser}</h2>
      {/* 自分のタスクリストor自分が作成したグループへ */}
      <div className="justify-content-center logged_in_top_page">
        <h3 className="text-center mb-3 mt-3">Your Contents</h3>
        <Button
          variant="success"
          className="mr-2"
          onClick={() => history.push(`/todo/top`)}
        >
          Go Own Task
        </Button>
        <Button
          variant="success"
          className="mr-2"
          onClick={() => history.push(`/user_group/top`)}
        >
          Go Own Group
        </Button>
      {/* ユーザー検索フォーム(そのユーザーのタスクリストへ飛べるようにする) */}
      <h3 className="text-center mb-3 mt-3">Go other users' task</h3>
          <SearchUserComponent />
      </div>
      {/* ランダムに5件ユーザーのタスクリストへのリンクボタンがでる */}
      <div className="justify-content-center random_user_linkButton">
        <h3 className="text-center mb-3 mt-3">
          Want to see what other users' task?
        </h3>
        <Col>
          {UserList.map((user) => (
            <Button
              key={user.id}
              className="mb-2 mr-2"
              onClick={() => history.push(`/todo/list/${user.username}`)}
            >
              {user.username} Task
            </Button>
          ))}
        </Col>
      </div>
    </div>
  );
};

export default TopPage_authenticated;
