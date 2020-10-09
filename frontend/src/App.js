import React, { Component } from "react";
// import store from "../store";
// import Header from "./Header";
import MainContent from "./MainContent";
import "bootstrap/dist/css/bootstrap.min.css";
// import history from "./utils/historyUtils";
import { BrowserRouter } from "react-router-dom";
import AlertComponent from './components/Alert';

export default class App extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <BrowserRouter>
            <MainContent />
            <AlertComponent />
          </BrowserRouter>
        </div>
      </React.Fragment>
    );
  }
}

// import React, { Component } from "react";
// import axios from "axios";

// class App extends Component {
//   state = {
//     todo: [],
//   };

//   componentDidMount() {
//     this.getTodo();
//   }

//   getTodo() {
//     axios
//       .get("http://127.0.0.1:8000/todo/api/")
//       .then((res) => {
//         this.setState({ todo: res.data });
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   render() {
//     return (
//       <div>
//         {this.state.todo.map(item => (
//           <div key={item.id}>
//             <h1>{item.task_name}</h1>
//             <p>{item.task_detail}</p>
//           </div>
//         ))}
//       </div>
//     );
//   }
// }
// export default App;

