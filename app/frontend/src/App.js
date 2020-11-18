import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import MainContent from "./MainContent";
import { BrowserRouter } from "react-router-dom";
import AlertComponent from './Components/Alert';
import HeaderComponent from './Components/Header';
import FooterComponent from './Components/Footer';

var csrftoken = Cookies.get("csrftoken");
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.withCredentials = true;

export default class App extends Component {

  render() {
    return (
      <React.Fragment>
          <BrowserRouter>
          <div className="app">
              <HeaderComponent />
              <MainContent />
              <AlertComponent />
              <footer>
                <FooterComponent />
              </footer>
          </div>
          </BrowserRouter>

      </React.Fragment>
    );
  }
}
