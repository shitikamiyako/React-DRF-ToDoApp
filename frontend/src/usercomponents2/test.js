// フォームの入力状態の監視とDispatch(処理実行)とでコンポーネントを作る
// それをあとでLoginFormテンプレートで合体

// まずLoginFormをreact-hook-formとReact-Bootstrapでリファクタリングする。

// フォーム

import React from 'react';
import { useForm }from 'react-hook-form'
import { Container, Form, Row, Col, Button, ButtonToolbar } from 'react-bootstrap';
import showResults from "../utils/showResults";

// import Cookies from 'js-cookie';


// const loginUrl = AuthUrls.LOGIN;
// var csrftoken = Cookies.get('csrftoken');
// console.log(csrftoken);
// axios.defaults.xsrfCookieName = 'csrftoken'
// axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
// axios.defaults.withCredentials = true

const MyForm = () => {
    const { register, handleSubmit, watch, errors, reset, formState } = useForm();

    const onSubmit = showResults;
    // const onSubmit = axios.post(loginUrl, data).then((response) => {
    //     // const cookiesdata = Cookies.get()
    //     // console.log({ cookiesdata })
    //     dispatch(loginUser());

    //     history.push("/");
    // })
    //     .catch((error) => {
    //         console.log(error.response);
    // })

    return (
        <div>
            <Container style={{padding:15}}>
                <Row>
                    <Col sm={10}>
                        <Form noValidate onSubmit={handleSubmit(onSubmit)}>
                        {/* username input */}
                            <Form.Group as={Row} controlId={'username'}>
                                <Form.Label column sm={2}>{'ユーザー名'}</Form.Label>
                                <Col sm={5}>
                                    <Form.Control
                                        name={'username'}
                                        placeholder={'Username'}
                                        type={'text'}
                                        isInvalid={errors.username}
                                        ref={register({
                                            required: "ユーザ名は必須です",
                                            maxLength: {
                                                value: 30,
                                                message: '30文字以内です'
                                            }
                                        })}
                                    />
                                    {
                                        errors.username &&
                                        <Form.Control.Feedback type="invalid">
                                            {errors.username.message}
                                        </Form.Control.Feedback>
                                    }
                                </Col>
                            </Form.Group>

                            {/* password input */}
                            <Form.Group as={Row} controlId={'password'}>
                                <Form.Label column sm={2}>{'パスワード'}</Form.Label>
                                <Col sm={5}>
                                    <Form.Control
                                        name={'password'}
                                        placeholder={'Password'}
                                        type={'password'}
                                        isInvalid={errors.password}
                                        ref={register({
                                            required: "パスワードは必須です",
                                            maxLength: {
                                                value: 30,
                                                message: '30文字以内です'
                                            }
                                        })}
                                    />
                                    {
                                        errors.password &&
                                        <Form.Control.Feedback type="invalid">
                                            {errors.password.message}
                                        </Form.Control.Feedback>
                                    }
                                </Col>
                            </Form.Group>
                            <Form.Group>
                                <Col smoffset={2} sm={5}>
                                    <ButtonToolbar>
                                        <Button variant={'primary'} type="submit" disabled={formState.isSubmitting}>登録</Button>
                                        <Button variant={'secondary'} type="button" onClick={reset}>クリア</Button>
                                    </ButtonToolbar>
                                </Col>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Container>
            <div>
                <p className="watch-text">watch output: {watch('username')}</p>
                <p className="watch-text">watch output: {watch('password')}</p>
            </div>
        </div>
    );
};



export default MyForm