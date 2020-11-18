// ライブラリなどのインポート
import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import _ from "lodash";
import axios from "axios";

// カスタムHooks
import useSpinner from "../Hooks/useSpinner";
import useAlert from "../Hooks/useAlert";
import useFlag from "../Hooks/useFlag";
import usePage from "../Hooks/usePage";

// その他インポート
import { AuthUrls } from "../Utils/authUrls";
// react-bootstrap
import { Button, Pagination, Toast, Col, Row } from "react-bootstrap";

const GroupList = () => {
  // グループリストに関するHooks
  const [groupList, setGroupList] = useState([]);
  // グループを追加したかのHooks
  const { groupListChange, addGroup, GroupListChangeReset } = useFlag();
  // スピナーに関するHooks
  const { startProgress, stopProgress } = useSpinner();
  // アラートに関するHooks
  const { createAlert } = useAlert();
  // ページネーションに関するHooks
  const {
    get_pageNationNext,
    get_pageNationPrevious,
    get_pageNationLastNumber,
    get_pageNationCurrent,
    get_contentsAllCount,
    pageNationNext,
    pageNationPrevious,
    pageNationLastNumber,
    pageNationCurrent,
  } = usePage();
  const history = useHistory();
  // グループリストAPIへのGETリクエストURL
  let getGroupListUrl = null;
  const deleteGroupUrl = AuthUrls.GET_OR_EDIT_USER_GROUP;

  const pullGroupList = async () => {
    startProgress();
    // 初回レンダー及び最初の10件を取得するためのURL
    if (getGroupListUrl === null) {
      getGroupListUrl = AuthUrls.GET_LIST_USER_GROUP;
    }
    // グループ取得のリクエスト
    try {
      const response = await axios.get(getGroupListUrl);
      const responseMap = response.data.results.map((obj) => {
        return obj;
      });
      // ペジネーション関係の情報をstateに格納
      get_pageNationNext(response.data.next);
      get_pageNationPrevious(response.data.previous);
      get_pageNationLastNumber(response.data.total_pages);
      get_pageNationCurrent(response.data.current_page);
      get_contentsAllCount(response.data.count);
      // グループに関する情報を格納
      const responseData = _.mapKeys(responseMap, "id");
      const saveGroupList = Object.values(responseData);
      setGroupList(saveGroupList);
      createAlert({
        message: "グループリストの取得に成功しました",
        type: "success",
      });
    } catch (error) {
      createAlert({
        message: "グループリストの取得に失敗しました",
        type: "danger",
      });
    } finally {
      stopProgress();
    }
  };

  const groupDelete = async (GROUP_ID) => {
    const group_id = GROUP_ID;
    const requestUrl = deleteGroupUrl + group_id;
    try {
      const response = await axios.delete(requestUrl);
      createAlert({
        message: "グループの削除に成功しました",
        type: "success",
      });
      addGroup();
    } catch (error) {
      createAlert({
        message: "グループの削除に失敗しました",
        type: "danger",
      });
    } finally {
      stopProgress();
    }
  };
  // ペジネーション
  let CurrentPage = pageNationCurrent;

  // useEffect
  useEffect(() => {
    pullGroupList();
    GroupListChangeReset();
  }, [groupListChange]);

  return (
    <div>
      <Row className="groupList justify-content-center">
        {groupList.map((group) => (
          <Col xs={12} sm={12} md={6} key={group.id}>
            <Toast className="justify-content-center mb-3">
              <Toast.Header closeButton={false}>
                <strong className="mr-auto">{group.group_name}</strong>
              </Toast.Header>
              <Toast.Body className="text-align-center">
                <div className="groupButton justify-content-center">
                  <Button
                    variant="outline-success"
                    className="mr-2"
                    onClick={() => history.push(`/user_group/edit/${group.id}`)}
                  >
                    Detail
                  </Button>
                  <Button
                    variant="outline-danger"
                    // className="mr-2"
                    onClick={() => groupDelete(`${group.id}`)}
                  >
                    Delete
                  </Button>
                </div>
              </Toast.Body>
            </Toast>
          </Col>
        ))}
      </Row>
      <Pagination className="justify-content-center">
        <Pagination.First
          onClick={() => {
            pullGroupList((getGroupListUrl = AuthUrls.GET_LIST_USER_GROUP));
          }}
        />
        <Pagination.Prev
          onClick={() => {
            pullGroupList((getGroupListUrl = pageNationPrevious));
          }}
        />
        <Pagination.Item>{CurrentPage}</Pagination.Item>
        <Pagination.Next
          onClick={() => {
            pullGroupList((getGroupListUrl = pageNationNext));
          }}
        />
        <Pagination.Last
          onClick={() => {
            pullGroupList(
              (getGroupListUrl =
                AuthUrls.GET_LIST_USER_GROUP_Last + pageNationLastNumber)
            );
          }}
        />
      </Pagination>
      <Button
        variant="success content-end-button"
        className="mr-2"
        onClick={() => history.push(`/`)}
      >
        Go Back Top
      </Button>
    </div>
  );
};

export default GroupList;
