import axios from "axios";
import { SubmissionError } from "redux-form";
import history from "../utils/historyUtils";
// import { actions as notifActions } from 'redux-notifications';

// import { AuthTypes } from "../constants/actionTypes";
import { AuthUrls } from "./urls";
import * as actions from "./actions";
import { AuthTypes } from "./actionTypes";
// import store from "../store";
// import { getUserToken } from "../utils/authUtils";

// const { notifSend } = notifActions;

const loginUrl = AuthUrls.LOGIN;

const loginUser = (formValues, dispatch, props) => {
  return axios
    .post(loginUrl, formValues)
    .then((response) => {
      const token = response.data.token;
      console.log(token);
      dispatch(actions.Login(token));
      localStorage.setItem("token", token);


      history.push("/");
    })
    .catch((error) => {
      const processedError = processServerError(error.response.data);
      throw new SubmissionError(processedError);
    });
}

function logoutUser(dispatch) {
  localStorage.removeItem("token");
  dispatch(actions.Logout);
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

export {
  loginUser,
  logoutUser
};