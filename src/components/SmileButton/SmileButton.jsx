import { useContext, useEffect, useState } from 'react';
import { ContextGame } from '../Game/ContextGame';

import StyledSmileButton from './StyledSmileButton';

function SmileButton() {
  const [smileType, setSmileType] = useState(0);

  const { resetGame, isGameOver, fieldIsPressed, reseting } = useContext(ContextGame);

  useEffect(switchTypeOnGameOver, [isGameOver]);
  useEffect(switchTypeOnFieldPressed, [fieldIsPressed]);
  useEffect(resetSmileButton, [reseting]);

  function switchTypeOnGameOver() {
    if (!isGameOver) return;
    if (isGameOver === 'win') setSmileType(3);
    if (isGameOver === 'loose') setSmileType(4);
  }

  function switchTypeOnFieldPressed() {
    if (!fieldIsPressed) setSmileType(0);
    if (fieldIsPressed) setSmileType(2);
  }

  function resetSmileButton() {
    if (reseting) setSmileType(0);
  }

  return <StyledSmileButton as="button" value={smileType} onClick={resetGame}></StyledSmileButton>;
}

export default SmileButton;
