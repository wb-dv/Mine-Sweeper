import { useState } from 'react';
import { ContextGame } from './ContextGame.js';

import StyledGame from './StyledGame.js';

import ControlPanel from '../ControlPanel/ControlPanel';
import BombField from '../BombField/BombField';

function Game(props) {
  const [remainingBomb, setRemainingBomb] = useState(props.bombAmount);
  const [isFirstClick, setFirstClick] = useState(true);
  const [isGameOver, setGameOver] = useState(false);
  const [fieldIsPressed, setFieldIsPressed] = useState(false);
  const [reseting, setReseting] = useState(0);

  function resetGame() {
    setReseting((prev) => ++prev);

    setRemainingBomb(props.bombAmount);
    setGameOver(false);
    setFieldIsPressed(false);
    setFirstClick(true);
  }

  return (
    <ContextGame.Provider
      value={{
        remainingBomb,
        setRemainingBomb,
        isGameOver,
        setGameOver,
        fieldIsPressed,
        setFieldIsPressed,
        isFirstClick,
        setFirstClick,
        resetGame,
        reseting,
        setReseting,
      }}
    >
      <StyledGame {...props}>
        <ControlPanel {...props} />
        <BombField {...props} />
      </StyledGame>
    </ContextGame.Provider>
  );
}

export default Game;
