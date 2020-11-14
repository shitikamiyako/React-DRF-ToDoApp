import React from "react";
import { useHistory } from "react-router-dom";
import { Button, Col, Jumbotron, Card, ListGroup } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const TopPage_unauthenticated = () => {
  const history = useHistory();

  return (
    <div className="landing">
      <Col sm={12} md={12} className="landing-col">
        <Jumbotron className="landing-main">
          <div className="jumbotron-title">
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
        </Jumbotron>
        <div className="landing-item  landing-how">
          <div className="landing-title title-how">
            <h2>What you can do with this app</h2>
          </div>
          <Card className="card-how">
            <Card.Header>タスクの追加・削除・フィルタリング</Card.Header>
            <ListGroup variant="flush">
            <ListGroup.Item>通常のTodoアプリとしての機能です</ListGroup.Item>
            <Card.Header>タスクに対する自己評価機能(レーティング)</Card.Header>
            <ListGroup variant="flush"></ListGroup>
            <ListGroup.Item>タスクの消化に関しての自分の取り組み方を省み、評価するきっかけにどうぞ</ListGroup.Item>
            <Card.Header>タスクに対する他者評価機能(いいね)</Card.Header>
            <ListGroup variant="flush"></ListGroup>
            <ListGroup.Item>他人のタスクにリアクションをつけることでモチベーションの支えになることができるかもしれません</ListGroup.Item>
            <Card.Header>タスクの外部発信(ランダム取得機能、ユーザータスク検索)</Card.Header>
            <ListGroup variant="flush"></ListGroup>
            <ListGroup.Item>あなたのタスクは常に誰かに見られているかもしれません。怠けているのがバレてるかも……？</ListGroup.Item>
            <Card.Header>タスクに対するタイマー機能</Card.Header>
            <ListGroup variant="flush"></ListGroup>
            <ListGroup.Item>最大3時間までセットできます。短期のタスクにどうぞ。タイマー終了ですぐにタスクの評価もできます。</ListGroup.Item>
            </ListGroup>
          </Card>
        </div>

        <div className="landing-item landing-caution">
          <div className="landing-title title-caution">
            <h2>Cautions for use</h2>
          </div>
          <Card className="card-caution">
            <Card.Header>アプリのコンセプト</Card.Header>
            <ListGroup variant="flush">
            <ListGroup.Item>このアプリは自分のタスクを外部に公開することを前提としたTodoアプリです。</ListGroup.Item>
            <Card.Header>使用上の注意事項</Card.Header>
            <ListGroup variant="flush"></ListGroup>
            <ListGroup.Item>個人情報や個人を特定できる内容は登録しないでください。</ListGroup.Item>
            <ListGroup.Item>利用には登録が必要です。</ListGroup.Item>
            <ListGroup.Item>
            エラーメッセージが出た場合はログアウトして、もう一度ログインし直してください。
            それでも改善しない場合は、下記のTwitterリンクからご連絡頂けると幸いです。
            </ListGroup.Item>
            </ListGroup>
          </Card>
        </div>

        <div className="landing-item landing-aboutMe">
          <div className="landing-title title-aboutMe">
            <h2>About Me</h2>
          </div>
          <Card>
            <Card.Header>略歴</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>2015年 明治大学文学部文学科演劇学部卒業</ListGroup.Item>
              <ListGroup.Item>同年～2016年3月 在学中から通っていた声優養成所。
              声帯浮腫に罹患、失声寸前まで状態が悪化する</ListGroup.Item>
              <ListGroup.Item>同年同月～9月  声帯浮腫の治療とリハビリにつき一切声を発せなくなる。</ListGroup.Item>
              <ListGroup.Item>同年9～11月  なんとか声を取り戻す、リハビリを兼ねて市民劇団の公演に参加させていただく。</ListGroup.Item>
              <ListGroup.Item>同年12月～ 書店のパートタイマーになり、以後2020年11月現在在職中。</ListGroup.Item>
              <ListGroup.Item>2017年 司書資格取得</ListGroup.Item>
              <ListGroup.Item>2018年 図書館司書の公務員試験受験、2次で落ちる</ListGroup.Item>
              <ListGroup.Item>2018年12月 プログラミングと出会い、ITパスポートを取る。</ListGroup.Item>
              <ListGroup.Item>2020年12～1月 Laravelを始めて施設予約システムを作ってみる</ListGroup.Item>
              <ListGroup.Item>2020年2～4月 就活するも社会人経験がない未経験のため失敗、コロナのため就活困難に</ListGroup.Item>
              <ListGroup.Item>2020年5～6月 オンラインでのDjangoを使ったチーム開発プロジェクトに参加させていただく。開始前に0からPythonとDjangoを勉強。</ListGroup.Item>
              <ListGroup.Item>2020年7~9月 プロジェクトの経験を活かしたポートフォリオを作ろうと設計・準備を開始</ListGroup.Item>
              <ListGroup.Item>2020年10月 このアプリの制作を開始、11月にひとまずの完成を見る</ListGroup.Item>
            </ListGroup>
            <Card.Header>資格</Card.Header>
            <ListGroup variant="flush">
            <ListGroup.Item>中学校教諭一種免許状(国語)</ListGroup.Item>
            <ListGroup.Item>高等教諭一種免許状(国語)</ListGroup.Item>
            <ListGroup.Item>司書教諭資格</ListGroup.Item>
            <ListGroup.Item>司書資格</ListGroup.Item>
            <ListGroup.Item>ITパスポート</ListGroup.Item>
            </ListGroup>
            <Card.Header>その他</Card.Header>
            <ListGroup variant="flush">
            <ListGroup.Item className="link-twitter"><a href="https://twitter.com/shitikamiyako"><FontAwesomeIcon icon={faTwitter} /></a></ListGroup.Item>
            <ListGroup.Item className="link-github"><a href="https://github.com/shitikamiyako"><FontAwesomeIcon icon={faGithub} /></a></ListGroup.Item>
            <ListGroup.Item><a href="https://www.resume.id/shitikamiyako">Resume</a></ListGroup.Item>
            <ListGroup.Item>学習用:<a href="https://qiita.com/shitikakei">Qiita</a></ListGroup.Item>
            </ListGroup>
          </Card>
        </div>
      </Col>
    </div>
  );
};

export default TopPage_unauthenticated;
