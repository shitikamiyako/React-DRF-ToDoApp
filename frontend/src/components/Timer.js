import React from "react";
import { useState, useEffect } from "react";
import { useTimer } from "react-timer-hook";
import { Button, Modal } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";

const MyTimer = ({ expiryTimestamp }) => {
  const { id } = useParams();
  const history = useHistory();

  // タイマーセットから何秒経ったか
  const [count, setCount] = useState(0);
  const resetCountUp = () => setCount(0);
  const countUp = () => {
    setCount((count) => count + 1);
  };

  useEffect(() => {
    const timerId = setInterval(countUp, 1000);
    return () => clearInterval(timerId);
  }, []);
  // pauseした時、またはリスタートの時に使うにカウントを保存する
  const [previousCount, setPreviousCount] = useState(0);
  const [timer, setTimer] = useState(false);

  const {
    seconds,
    minutes,
    hours,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp,
    onExpire: () => setTimer(true),
  });

  let TimerFinishMessage = <p>{isRunning ? "Running" : "Not running"}</p>;

  if (timer) {
    TimerFinishMessage = (
      <div>
        <p>お疲れ様でした、下のボタンからこのタスクを評価することができます</p>
        <Button
          variant="outline-success"
          className="mr-2"
          onClick={() => history.push(`/todo/edit/${id}`)}
        >
          タスク編集画面へ
        </Button>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center" }}>
      <Modal.Body>
        <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
        {TimerFinishMessage}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-primary"
          onClick={() => {
            start();
          }}
        >
          Start
        </Button>
        <Button
          variant="outline-secondary"
          onClick={() => {
            pause();
            setPreviousCount(count);
          }}
        >
          Pause
        </Button>
        <Button
          variant="outline-info"
          onClick={() => {
            resume();
            setCount(previousCount);
          }}
        >
          Resume
        </Button>
        <Button
          variant="outline-danger"
          onClick={() => {
            pause();
            setPreviousCount(count);
            const initialTime = expiryTimestamp;
            initialTime.setSeconds(initialTime.getSeconds() + count);
            restart(initialTime);
            resetCountUp();
          }}
        >
          Restart
        </Button>
      </Modal.Footer>
    </div>
  );
};

export default MyTimer;
