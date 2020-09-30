import "bootstrap/dist/css/bootstrap.css";
import 'redux-notifications/lib/styles.css';
import "./styles/style.css"
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { CookiesProvider } from 'react-cookie';
import store from "./store/";
import App from "./App";
import "./css/style.css";
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

let persistor = persistStore(store);

ReactDOM.render(
    <Provider store={store}>
        <CookiesProvider>
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
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
