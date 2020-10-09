import React from "react";
import AddTask from "./addTask";
import TaskList from "./TaskList";
import axios from "axios";
import Cookies from 'js-cookie';
import { Container, Row, Col } from "react-bootstrap";


var csrftoken = Cookies.get('csrftoken');
console.log(csrftoken);
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
// axios.defaults.headers.common['Authorization'
axios.defaults.withCredentials = true

const Todo = () => {

  const TaskListComponent = React.memo(() => {
    console.log('render')
    return (
      <TaskList />
    )
  })


  return (
    <div>
      <Container>
        <Row className="justify-content-center mx-auto mt-5 p-2">          <Col sm={4} md={8}>
            <h1>Sample Title</h1>
            <AddTask />
            <h2>ToDo List</h2>
          <TaskListComponent />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Todo;
