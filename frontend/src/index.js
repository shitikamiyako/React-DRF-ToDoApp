import "bootstrap/dist/css/bootstrap.css";
import 'redux-notifications/lib/styles.css';
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { CookiesProvider } from 'react-cookie';
import store from "./Store/";
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
