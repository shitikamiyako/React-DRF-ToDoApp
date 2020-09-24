import axios from "axios";
import { SubmissionError } from "redux-form";
import history from "../utils/historyUtils";
// import { actions as notifActions } from 'redux-notifications';

// import { AuthTypes } from "../constants/actionTypes";
import { AuthUrls } from "./urls";
import * as actions from "./actions";
import { useDispatch } from "react-redux";
import { useCookies } from 'react-cookie';
import Cookies from 'js-cookie';
// import store from "../store";
// import { getUserToken } from "../utils/authUtils";

// const { notifSend } = notifActions;

const loginUrl = AuthUrls.LOGIN;
const logoutUrl = AuthUrls.LOGOUT;
var csrftoken = Cookies.get('csrftoken');
console.log(csrftoken);
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
axios.defaults.withCredentials = true

// const axiosPost = axios.create({
//   xsrfCookieName: 'csrftoken',
//   xsrfHeaderName: 'X-CSRFTOKEN',
// })

// console.log(axiosPost);

export const loginUser = (formValues, dispatch) => {


  return (
    axios
    .post(loginUrl, formValues)
    .then((response) => {
      // const cookiesdata = Cookies.get()
      // console.log({ cookiesdata })
      dispatch(loginUser());

      history.push("/");
    })
      .catch((error) => {
        console.log(error.response);
    })
  )
};

export const logoutUser = (dispatch) => {

  return (
    axios
      .post(logoutUrl)
      .then((response) => {
        // const cookiesdata = Cookies.get()
        // console.log({ cookiesdata })
        dispatch(logoutUser());

      })
      .catch((error) => {
        console.log(error.response);
      })
  )

}

// function logoutUser() {
//   localStorage.removeItem("token");
//   return {
//     type: AuthTypes.LOGOUT
//   };
// }

function processServerError(error) {
  return Object.keys(error).reduce(
    function (newDict, key) {
      if (key === "non_field_errors") {
        newDict["_error"].push(error[key]);
      } else if (key === "token") {
        // token sent with request is invalid
        newDict["_error"].push("The link is not valid any more.");
      } else {
        newDict[key] = error[key];
      }

      return newDict;
    },
    { _error: [] }
  );
}

// export {
//   loginUser,
//   // logoutUser
// };