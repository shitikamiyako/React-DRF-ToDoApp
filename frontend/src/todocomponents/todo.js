import React from "react";
import AddTask from "./addTask";
import TaskList from "./TaskList";
import { Container, Row, Col } from "react-bootstrap";

const Todo = () => {
  const TaskListComponent = React.memo(() => {
    return <TaskList />;
  });

  const AddTaskComponent = React.memo(() => {
    return <AddTask className="mb-3 mt-3" />;
  });

  return (
    <div>
      <Container>
        <Row className="justify-content-center mx-auto mt-3 p-2">
          <Col sm={12} md={12}>
            <h3 className="text-center mb-3 mt-3">Add Task</h3>
            <AddTaskComponent />
            <h3 className="text-center mb-3 mt-3">ToDo List</h3>
            <TaskListComponent />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Todo;
