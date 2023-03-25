/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react';
import { ContextGame } from '../Game/ContextGame';

import Counter from '../Counter/Counter';

function Timer(props) {
  const [time, setTime] = useState(0);
  const [timerID, setTimerID] = useState(null);

  const { isFirstClick, isGameOver, reseting } = useContext(ContextGame);

  useEffect(startTimer, [isFirstClick]);

  useEffect(() => {
    if (!isGameOver) return;
    clearInterval(timerID);
  }, [isGameOver]);

  useEffect(resetTimer, [reseting]);

  function startTimer() {
    if (isFirstClick) return;

    let id = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(id);
    }, 999000);

    setTimerID(id);
  }

  function resetTimer() {
    if (reseting) {
      clearInterval(timerID);
      setTimerID(null);
      setTime(0);
    }
  }

  return <Counter counterValue={time} digit={props.digit} />;
}

export default Timer;
