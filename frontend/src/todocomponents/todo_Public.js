import React from "react";
import TaskList_Readonly from "./TaskList_Readonly";
import axios from "axios";
import Cookies from 'js-cookie';
import { Container, Row, Col } from "react-bootstrap";


var csrftoken = Cookies.get('csrftoken');
console.log(csrftoken);
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
axios.defaults.withCredentials = true

const Todo = () => {

  const TaskListComponent = React.memo(() => {
    console.log('render')
    return (
      <TaskList_Readonly />
    )
  })


  return (
    <div>
      <Container>
        <Row className="justify-content-center mx-auto mt-3 p-2">
          <Col sm={12} md={12}>
            <h3 className="text-center mb-3 mt-3">Todo List</h3>
            <TaskListComponent />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Todo;
