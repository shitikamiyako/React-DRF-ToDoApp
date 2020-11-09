import React from "react";
import GroupForm from "./GroupForm";
import GroupList from "./GroupList";
import axios from "axios";
import Cookies from 'js-cookie';
import { Container, Row, Col } from "react-bootstrap";


var csrftoken = Cookies.get('csrftoken');
console.log(csrftoken);
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
axios.defaults.withCredentials = true

const Group = () => {

    const GroupListComponent = React.memo(() => {
        console.log('render_GroupList')
        return (
            <GroupList />
        )
    })
    const GroupFormComponent = React.memo(() => {
        console.log('render_GroupList')
        return (
            <GroupForm className="mb-3 mt-3"/>
        )
    })


    return (
        <div>
            <Container>
                <Row className="justify-content-center mx-auto mt-3 p-2">
                    <Col sm={12} md={12}>
                        <h3 className="text-center mb-3 mt-3">Add Group</h3>
                        <GroupFormComponent />
                        <h3 className="text-center mb-3 mt-3">Group List</h3>
                        <GroupListComponent />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Group;
