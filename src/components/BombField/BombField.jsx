import { useContext, useEffect, useState } from 'react';
import { Utils } from '../../Utils';
import { ContextGame } from '../Game/ContextGame';

import StyledBombField from './StyledBombField';
import Cell from '../Cell/Cell';

function BombField(props) {
  let { size, bombAmount } = { ...props };

  const [field, setField] = useState(() => createBombField(size, bombAmount));
  const [checkedCells, setCheckedCells] = useState([]);
  const [cellsKeys, setCellsKeys] = useState(() => createCellsKeys(size));
  const [markedBombCounter, setMarkedBombCounter] = useState(0);

  const { fieldIsPressed, setFieldIsPressed, reseting, isGameOver, setGameOver } = useContext(ContextGame);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(resetField, [reseting]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(setWin, [markedBombCounter, checkedCells]);

  function setWin() {
    if (markedBombCounter === Utils.params.bombAmount && allNotBombsIsChecked()) {
      setGameOver('win');
      return;
    }
  }

  function allNotBombsIsChecked() {
    const checkedCellsAmount = field.reduce((checkedCounter, _, i) => {
      return checkedCells.includes(i) ? ++checkedCounter : checkedCounter;
    }, 0);

    return checkedCellsAmount === size ** 2 - Utils.params.bombAmount;
  }

  function resetField() {
    if (reseting) {
      setField(() => createBombField(size, bombAmount));
      setCheckedCells([]);
      setCellsKeys(() => createCellsKeys(size));
      setMarkedBombCounter(0);
    }
  }

  function onFieldMouseDown(e) {
    if (!fieldIsPressed && e.nativeEvent.button !== 2) setFieldIsPressed(true);
  }

  function onFieldMouseUp(e) {
    if (fieldIsPressed && e.nativeEvent.button !== 2) setFieldIsPressed(false);
  }

  const eventHandlers = {
    onMouseDown: isGameOver ? () => {} : onFieldMouseDown,
    onMouseUp: isGameOver ? () => {} : onFieldMouseUp,
  };

  return (
    <StyledBombField {...props} {...eventHandlers}>
      {field.map((val, i) => (
        <Cell cellValue={val} idx={i} setField={setField} checkedCells={checkedCells} setCheckedCells={setCheckedCells} setMarkedBombCounter={setMarkedBombCounter} key={cellsKeys[i]} size={size} />
      ))}
    </StyledBombField>
  );
}

function createBombField(size, bombAmount) {
  const field = new Array(size ** 2).fill(0);

  for (let i = 1; i <= bombAmount; ) {
    let x = Math.floor(Math.random() * size);
    let y = Math.floor(Math.random() * size);
    let currentIndex = x * size + y;

    if (field[currentIndex] === Utils.params.bomb) continue;

    field[currentIndex] = Utils.params.bomb;

    i++;

    Utils.Neighbors.updateNeighbors(currentIndex, field, 'inc');
  }

  return field;
}

function createCellsKeys(size) {
  let start = Math.floor(Math.random() * Date.now());
  return new Array(size ** 2).fill(0).map((_) => ++start);
}

export default BombField;
