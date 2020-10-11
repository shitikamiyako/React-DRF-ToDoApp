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
        <Row className="justify-content-center mx-auto mt-3 p-2">
          <Col sm={12} md={12}>
            <h3 className="text-center mb-3 mt-3">Sample Title</h3>
            <AddTask className="mb-3 mt-3" />
            <h3 className="text-center mb-3 mt-3">ToDo List</h3>
            <TaskListComponent />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Todo;
