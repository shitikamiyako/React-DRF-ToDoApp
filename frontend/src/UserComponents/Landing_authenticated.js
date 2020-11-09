import React from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import _ from "lodash";
import axios from "axios";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";


import useUser from "../Hooks/useUser";
import useFlag from "../Hooks/useFlag";
import useSpinner from "../Hooks/useSpinner";
import useAuth from "../Hooks/useAuth";

import { AuthUrls } from "../Utils/authUrls";
// import { TodoUrls } from "../utils/todoUrls";

const Landing_authenticated = () => {
    const get_user_ListUrl = AuthUrls.GET_USER_LIST;
    const get_userUrl = AuthUrls.GET_USER_DATA;

    const history = useHistory();

    const [user, setUser ] = useState();
    const { logoutUser, authenticated } = useAuth();


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

        try {
            const response = await axios.get(get_userUrl)
            console.log(response.data.username);
            setUser(response.data.username)

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
            <p>hello, {user} </p>
            {/* <p>pathname: {location.pathname}</p>
            <p>search: {location.search}</p>
            <p>hash: {location.hash}</p> */}
            <Button variant="success" className="mr-2" onClick={() => history.push(`/todo/top`)}>
                Go Own Task
            </Button>
            <Button variant="success" className="mr-2" onClick={() => history.push(`/user_group/top`)}>
                Go Own Group
            </Button>
            {userList.map((user) => (
                <Button key={user.id} className="mr-2" onClick={() => history.push(`/todo/list/${user.username}`)}>
                {user.username} Task
                </Button>
            ))}
            {userList.map((user) => (
                <Button key={user.id} className="mr-2" onClick={() => history.push(`/user_group/list/${user.username}`)}>
                {user.username} Group
                </Button>
            ))}
            <Button variant="danger" className="mr-2" onClick={() => history.push(`/logout`)}>
                Logout
            </Button>
            <Button variant={"primary"} type="submit" onClick={() => logoutUser()}> test </Button>

        </div>

    );

};

export default Landing_authenticated;
