import { useContext } from 'react';
import { ContextGame } from '../Game/ContextGame';

import Counter from '../Counter/Counter';

function BombCounter(props) {
  let { remainingBomb } = useContext(ContextGame);

  return <Counter counterValue={remainingBomb} digit={props.digit} />;
}

export default BombCounter;
