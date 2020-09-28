// import React from 'react';
// import ReactDOM from 'react-dom';

// import App from './client';

// ReactDOM.render(<App />, document.getElementById('root'));

import "bootstrap/dist/css/bootstrap.css";
import 'redux-notifications/lib/styles.css';
import "./styles/style.css"
import React from "react";
import ReactDOM from "react-dom";
// import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import { CookiesProvider } from 'react-cookie';

// import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';

import store from "./store/";
// import store from "./store/auth_store";
// import history from "./utils/historyUtils";
// import { authLogin } from "./actions/authActions";
import App from "./App";
import "./css/style.css";
// const store = createStore(rootReducer, applyMiddleware(thunk));


// if (token) {
//     store.dispatch(authLogin(token));
// }

ReactDOM.render(
    <Provider store={store}>
        <CookiesProvider>
            <App />
        </CookiesProvider>
    </Provider>
    , document.getElementById("root"));
// import "bootstrap/dist/css/bootstrap.css";
// import 'redux-notifications/lib/styles.css';
// import "./styles/style.css"
// import React from "react";
// import ReactDOM from "react-dom";
// import { Router } from "react-router-dom";
// import { Provider } from "react-redux";

// import store from "./store";
// import history from "./utils/historyUtils";
// import { authLogin } from "./actions/authActions";
// import App from "./components/App";

// const token = localStorage.getItem("token");

// if (token) {
//     store.dispatch(authLogin(token));
// }

// ReactDOM.render(
//     <Provider store={store}>
//         <Router history={history}>
//             <App />
//         </Router>
//     </Provider>
//     , document.getElementById("root"));
