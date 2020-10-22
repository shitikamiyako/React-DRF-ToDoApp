import React from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import _ from "lodash";
import axios from "axios";
import { useEffect } from "react";
import { Button } from "react-bootstrap";


import useUser from "../hooks/useUser";
import useFlag from "../hooks/useFlag";
import useSpinner from "../hooks/useSpinner";

import { AuthUrls } from "../utils/authUrls";
// import { TodoUrls } from "../utils/todoUrls";

const Landing_authenticated = () => {
    const get_user_ListUrl = AuthUrls.GET_USER_LIST;

    const history = useHistory();

    const { getUserList, resetUserList, users } = useUser();
    const { startProgress, stopProgress } = useSpinner();
    const { userListChange, UserListChangeReset} = useFlag();



    const pullUserList = async () => {
        startProgress();
        resetUserList();

        try {
            const response = await axios.get(get_user_ListUrl)
            console.log(response.data.results);
            const responseMap = response.data.results.map((obj) => {
                return obj;
            });
            const UserList = _.mapKeys(responseMap, "id");
            getUserList(UserList)

            } catch (error) {
            console.log(error);
            } finally {
            stopProgress();
        }
    }

    console.log(Object.values(users));

    let userList = Object.values(users)

    // useEffect
    useEffect(() => {
        pullUserList();
        UserListChangeReset();
        // return pullTaskList;
    }, [userListChange]);

    return (
        <div>
            <h1>Welcome to this wonderful site.</h1>
            {/* <p>pathname: {location.pathname}</p>
            <p>search: {location.search}</p>
            <p>hash: {location.hash}</p> */}
            <Button variant="success" className="mr-2" onClick={() => history.push(`/todo/top`)}>
                Go Own Task
            </Button>
            {userList.map((user) => (
                <Button key={user.id} className="mr-2" onClick={() => history.push(`/todo/public/${user.username}`)}>
                {user.username} Task
                </Button>
            ))}
        </div>

    );

};

export default Landing_authenticated;
