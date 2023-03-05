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

  const { fieldIsPressed, setFieldIsPressed, reseting } = useContext(ContextGame);

  useEffect(resetField, [reseting]);

  function resetField() {
    if (reseting) {
      setField(createBombField(size, bombAmount));
      setCheckedCells([]);
      setCellsKeys(() => createCellsKeys(size));
    }
  }

  return (
    <StyledBombField {...props} onMouseDown={onFieldMouseDown} onMouseUp={onFieldMouseUp}>
      {field.map((val, i) => (
        <Cell
          cellValue={val}
          idx={i}
          useField={[field, setField]}
          useCheckedCells={[checkedCells, setCheckedCells]}
          key={cellsKeys[i]}
          size={size}
        />
      ))}
    </StyledBombField>
  );

  function onFieldMouseDown(e) {
    if (!fieldIsPressed && e.nativeEvent.button !== 2) setFieldIsPressed(true);
  }

  function onFieldMouseUp(e) {
    if (fieldIsPressed && e.nativeEvent.button !== 2) setFieldIsPressed(false);
  }
}

function createBombField(size, bombAmount) {
  const field = new Array(size ** 2).fill(0);

  for (let i = 0; i <= bombAmount; ) {
    let x = Math.floor(Math.random() * size);
    let y = Math.floor(Math.random() * size);
    let currentIndex = x * size + y;

    if (field[currentIndex] === Utils.bomb) continue;

    field[currentIndex] = Utils.bomb;

    i++;

    Utils.Neighbors.updateNeighbors(currentIndex, field, size, 'inc');
  }

  return field;
}

function createCellsKeys(size) {
  let start = Math.floor(Math.random() * Date.now());
  return new Array(size ** 2).fill(0).map((_) => ++start);
}

export default BombField;
