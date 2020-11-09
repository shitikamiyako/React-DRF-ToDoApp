import React from "react";

import useAuth from "../Hooks/useAuth";

import Landing_unauthenticated from "./Landing_unauthenticated"
import Landing_authenticated from "./Landing_authenticated"
// import Cookies from 'js-cookie';

// var jwt_auth = Cookies.get('jwt-auth');
// console.log(jwt_auth);


const Landing = () => {

    const { authenticated } = useAuth();


    let Landing_contents = <Landing_unauthenticated />

    if (authenticated === true) {
        Landing_contents = <Landing_authenticated />

    }



    return (
        <div>
            {Landing_contents}
        </div>
    );

};

export default Landing;
