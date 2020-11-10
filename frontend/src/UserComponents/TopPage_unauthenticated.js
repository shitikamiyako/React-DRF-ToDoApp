import React from "react";
import { useHistory } from "react-router-dom";
import { Button, Col, Jumbotron } from "react-bootstrap";

const TopPage_unauthenticated = () => {
    const history = useHistory();

    return (
        <div className="landing">
            <Jumbotron className="landing-main">
                <Col sm={12} md={12} className="landing-col">
                    <div className="landing-title">
                        <h1>Mix Up Our Todo</h1>
                        <p>あえて他人に公開・共有するTodoアプリ</p>
                        <Button
                            className="mr-2"
                            variant="primary"
                            onClick={() => history.push(`/login`)}
                        >
                            Login
                </Button>
                        <Button variant="success" onClick={() => history.push(`/signup`)}>
                            Register
                </Button>
                    </div>
                </Col>
            </Jumbotron>
            <Col sm={12} md={12} className="landing-col">
                <div className="landing-title  landing-how">
                    <h2>What you can do with this app</h2>
                    <div className="landing-contents">
                        <p>タスクの追加・削除・フィルタリング</p>
                        <p>タスクに対する自己評価機能(レーティング)</p>
                        <p>タスクに対する他者評価機能(いいね)</p>
                        <p>タスクの外部発信(ランダム取得機能、ユーザータスク検索)</p>
                        <p>タスクに対するタイマー機能</p>
                    </div>
                </div>
            </Col>

            <Col sm={12} md={12} className="landing-col">
                <div className="landing-title landing-caution">
                    <h2>Cautions for use</h2>
                    <div className="landing-contents">
                        <p>
                            このアプリは自分のタスクを外部に公開することを前提としたTodoアプリです。
                        </p>
                        <p>個人情報や個人を特定できる内容は登録しないでください。</p>
                        <p>利用には登録が必要です。</p>
                    </div>
                </div>
            </Col>
        </div>
    );
};

export default TopPage_unauthenticated;
