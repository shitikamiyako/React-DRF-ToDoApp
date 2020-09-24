// action

import { createAction } from "@reduxjs/toolkit";

// loginuserというアクション名でauthenticatedをTrueにする
{ type: 'loginuser', authenticated: true}

// ActionCreator

const initialState = {
    authenticated: false,
};


export const loginuser = createAction(
    'LOGIN',

)

curl - X POST "http://127.0.0.1:8000/dj-rest-auth/login/ " -H "accept: application/ json" -H "Content - Type: application / json" -H "X - CSRFToken: PtyQD8myoSnHAoelzMxve5JK7OihdwiLMZwuzz1bgjWJ8z7lTqL90j6QGkzrqvg4" -d "{\"username\": \"kibunomi\", \"password\": \"h1r0noml\"}"