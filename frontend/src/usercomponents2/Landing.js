import React from "react";
import Cookies from 'js-cookie';

var jwt_auth = Cookies.get('jwt-auth');
console.log(jwt_auth);


const Landing = () => (




    <h1>Welcome to this wonderful site.</h1>
);

export default Landing;
