import React from "react";
import axios from "axios";

import "../css/style.css";
import Form from "./form.js";
import List from "./TaskList.js";

const endPointUrl = "http://localhost:8000/todo/api";

export default class Todo extends React.Component {
  constructor(props) {
    super(props);

    this.getTodo = this.getTodo.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.toggleIsChecked = this.toggleIsChecked.bind(this);
    this.toggleIsDone = this.toggleIsDone.bind(this);

    this.state = {
      todoList: [],
    };
    this.getTodo();
  }

  getTodo() {
    let todoData;
    axios
      .get(`${endPointUrl}/`)
      .then(res => {
        todoData = res.data.map((obj) => {
          obj.isChecked = false;
          return obj;
        });
        this.setState({
          todoList: todoData,
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  addTodo(todoText) {
    let now;
    now = new Date();
    axios
      .post(`${endPointUrl}/`, {
        task_name: todoText,
        add_datetime: now,
      }).then(res => {
        this.getTodo();
      }).catch(err => {
        console.log(err);
      });
  }

  deleteTodo() {
    const newState = this.state.todoList.filter((todoObj, index) => {
      if (todoObj.isChecked) {
        axios
          .delete(`${endPointUrl}/${todoObj.uuid}/`)
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
      }

      return !todoObj.isChecked;
    });
    this.setState({
      todoList: newState,
    });
  }

  toggleIsChecked(index) {
    const newTodoList = this.state.todoList;
    newTodoList[index].isChecked = !this.state.todoList[index].isChecked;
    this.setState({
      todoList: newTodoList,
    });
  }

  toggleIsDone(index) {
    axios
      .put(`${endPointUrl}/${this.state.todoList[index].uuid}/`, {
        body: this.state.todoList[index].body,
        isDone: !this.state.todoList[index].isDone,
      })
      .then(res => {
        this.getTodo();
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="todo">
        <h1 className="todo__title">React on DRF ToDo App</h1>
        <Form addTodo={this.addTodo} />
        <h2>ToDo List</h2>
        <List
          todoList={this.state.todoList}
          deleteTodo={this.state.deleteTodo}
          toggleIsChecked={this.state.toggleIsChecked}
          toggleIsDone={this.state.toggleIsDone}
        />
      </div>
    );
  }
}
