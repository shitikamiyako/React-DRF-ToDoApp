// ライブラリなどのインポート
import React from "react";
import { useHistory , useLocation, useParams } from "react-router-dom";
// カスタムHooks
import useAuth from "../hooks/useAuth";
import { AuthUrls } from "../utils/authUrls";
import axios from "axios";
import queryString from 'query-string';
import { useState, useEffect } from "react";

// import useFilter from "../hooks/useFilter";

// その他インポート
// react-bootstrap

const TwitterLoginCallback = () => {
    const location = useLocation()
    console.log(location.search)
    const qs = queryString.parse(location.search)
    // const urlTest = AuthUrls.LOGIN_TWITTER_CALLBACK + location.search
    const urlTest = AuthUrls.TEST
    // const urlTest = 'https://api.twitter.com/oauth/access_token/' + location.search
    // const urlTest = 'http://127.0.0.1:8000/accounts/twitter/login/callback/' + location.search
    console.log(qs)
    console.log(qs.oauth_token)
    console.log(qs.oauth_verifier)
    const data1 = {
        access_token: qs.oauth_token,
        token_secret: qs.oauth_verifier
    }
    const data2 = {
        oauth_token: qs.oauth_token,
        oauth_verifier: qs.oauth_verifier
    }
    // const test = async () => {
    //     try{
    //         const response = await axios.post('https://api.twitter.com/oauth/access_token', data2)
    //         console.log(response)
    //         console.log(response.data)
    //     } catch(error) {
    //         console.log(error)
    //     }
    // }
    const test = async () => {
        try{
            const response = await axios.post(urlTest, data2)
            console.log(response)
            console.log(response.data)
        } catch(error) {
            console.log(error)
        }
    }
    useEffect(() => {
        test()
    },[])
    // console.log(oauth_token)
    const { loginUser} = useAuth();
    loginUser();
    const history = useHistory();
    history.push("/")

    return (
        <h1>Topページへ……</h1>
    )

}

export default TwitterLoginCallback;