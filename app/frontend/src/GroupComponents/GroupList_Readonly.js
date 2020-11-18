// ライブラリなどのインポート
import React from "react";
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
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
  // Group Hooks
  const { groupListChange, GroupListChangeReset } = useFlag();
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
  const { username } = useParams();

  // グループリストAPIへのGETリクエストURL
  let getGroupReadOnlyListUrl = null;

  const pullGroupList = async () => {
    startProgress();
    // 初回レンダー及び最初の10件を取得するためのURL
    if (getGroupReadOnlyListUrl === null) {
      getGroupReadOnlyListUrl =
        AuthUrls.GET_READONLY_USER_GROUP_SEARCH + username;
    }
    // グループ取得のリクエスト
    try {
      const response = await axios.get(getGroupReadOnlyListUrl);
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
                    onClick={() =>
                      history.push(`/user_group/${group.id}/members`)
                    }
                  >
                    Detail
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
            pullGroupList(
              (getGroupReadOnlyListUrl = AuthUrls.GET_LIST_USER_GROUP)
            );
          }}
        />
        <Pagination.Prev
          onClick={() => {
            pullGroupList((getGroupReadOnlyListUrl = pageNationPrevious));
          }}
        />
        <Pagination.Item>{CurrentPage}</Pagination.Item>
        <Pagination.Next
          onClick={() => {
            pullGroupList((getGroupReadOnlyListUrl = pageNationNext));
          }}
        />
        <Pagination.Last
          onClick={() => {
            pullGroupList(
              (getGroupReadOnlyListUrl =
                AuthUrls.GET_LIST_USER_GROUP_Last + pageNationLastNumber)
            );
          }}
        />
      </Pagination>
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

export default GroupList;
