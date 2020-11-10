import React from "react";
import { useHistory } from "react-router-dom";
import _ from "lodash";
import axios from "axios";
import { useState, useEffect } from "react";
import { Button, ButtonToolbar, Col } from "react-bootstrap";


import useUser from "../Hooks/useUser";
import useFlag from "../Hooks/useFlag";
import useAuth from "../Hooks/useAuth";
import SearchUser from "./SearchUser"

import { AuthUrls } from "../Utils/authUrls";

const TopPage_authenticated = () => {
    const get_user_ListUrl = AuthUrls.GET_USER_LIST_RANDOM;
    console.log(get_user_ListUrl)
    const get_userUrl = AuthUrls.GET_USER_DATA;

    const history = useHistory();

    const [loginUser, setUser ] = useState();
    const { logoutUser } = useAuth();


    const { getUserList, resetUserList, users } = useUser();
    const { userListChange, UserListChangeReset} = useFlag();



    const pullUserList = async () => {
        resetUserList();

        try {
            const response = await axios.get(get_user_ListUrl)
            console.log(response.data.results);
            const responseMap = response.data.results.map((obj) => {
                return obj;
            });
            const responseData = _.mapKeys(responseMap, "id");
            getUserList(responseData)
            } catch (error) {
            console.log(error);
            }

        try {
            const response = await axios.get(get_userUrl)
            console.log(response.data.username);
            setUser(response.data.username)
            } catch (error) {
            console.log(error);
            }
    }

    const UserList = Object.values(users)
    console.log(UserList)

    // useEffect
    useEffect(() => {
        pullUserList();
        UserListChangeReset();
        // return pullTaskList;
    }, [userListChange]);

    return (
        <div>

            {/* タイトル */}
            <h2 className="text-center mb-3 mt-3">Welcome, {loginUser}</h2>
            {/* ユーザー検索フォーム(そのユーザーのタスクリストへ飛べるようにする) */}
            <h3 className="text-center mb-3 mt-3">Search and Go other users' task</h3>
            <SearchUser />
            <h3 className="text-center mb-3 mt-3">Your Contents</h3>
            <div className="justify-content-center logged_in_top_page">
                <Button variant="success" className="mr-2" onClick={() => history.push(`/todo/top`)}>
                    Go Own Task
                </Button>
                <Button variant="success" className="mr-2" onClick={() => history.push(`/user_group/top`)}>
                    Go Own Group
                </Button>
            </div>
            {/* ランダムに5件ユーザーのタスクリストへのリンクボタンがでる */}
            <div className="justify-content-center random_user_linkButton">
                <h3 className="text-center mb-3 mt-3">Want to see what other users' task?</h3>
                <Col>
                    {UserList.map((user) => (
                        <Button key={user.id} className="mr-2" onClick={() => history.push(`/todo/list/${user.username}`)}>
                        {user.username} Task
                        </Button>
                    ))}
                </Col>
            </div>
        </div>

    );

};

export default TopPage_authenticated;
