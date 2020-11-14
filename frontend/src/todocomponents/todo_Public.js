import React from "react";
import TaskListReadonly from "./TaskList_Readonly";
import { Container, Row, Col } from "react-bootstrap";

const Todo = () => {

  const TaskListComponent = React.memo(() => {
    return (
      <TaskListReadonly />
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
