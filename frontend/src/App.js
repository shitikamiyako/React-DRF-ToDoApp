import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  state = {
    todo: [],
  };

  componentDidMount() {
    this.getTodo();
  }

  getTodo() {
    axios
      .get("http://127.0.0.1:8000/todo/api/")
      .then((res) => {
        this.setState({ todo: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        {this.state.todo.map(item => (
          <div key={item.id}>
            <h1>{item.task_name}</h1>
            <p>{item.task_detail}</p>
          </div>
        ))}
      </div>
    );
  }
}
export default App;
