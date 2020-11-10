import React, { Component } from "react";
// import store from "../store";
// import Header from "./Header";
import MainContent from "./MainContent";
import "bootstrap/dist/css/bootstrap.min.css";
// import history from "./utils/historyUtils";
import { BrowserRouter } from "react-router-dom";
import AlertComponent from './Components/Alert';
import HeaderComponent from './Components/Header';

export default class App extends Component {

  render() {
    return (
      <React.Fragment>
          <BrowserRouter>
          <header>
            <HeaderComponent />
          </header>
            <MainContent />
          <div className="container">
            <AlertComponent />
          </div>
          <footer>

          </footer>
          </BrowserRouter>
      </React.Fragment>
    );
  }
}
