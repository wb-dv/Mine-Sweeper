import { useContext, useEffect, useState } from 'react';
import { Utils } from '../../Utils';
import { ContextGame } from '../Game/ContextGame';

import StyledCell from './StyledCell';

function Cell(props) {
  const { useField, useCheckedCells, idx, cellValue, size } = props;

  const [isChecked, setChecked] = useState(false);
  const [mark, setMark] = useState(1);
  const [isMarked, setIsMarked] = useState(false);

  const [field, setField] = useField;
  const [checkedCells, setCheckedCells] = useCheckedCells;

  const { isFirstClick, setFirstClick, reseting } = useContext(ContextGame);

  useEffect(resetSell, [reseting]);

  function resetSell() {
    if (reseting) setChecked(false);
  }

  function checkCell(e) {
    if (isChecked || e.nativeEvent.button === 2 || isMarked) return e.stopPropagation();

    if (isFirstClick) {
      setFirstClick(false);

      if (cellValue === -1) {
        setField((field) => {
          const newField = [...field];
          let j = Math.floor(Math.random() * newField.length);

          if (j < newField.length / 2) {
            while (newField[j] === -1) {
              j++;
            }
          } else {
            while (newField[j] === -1) {
              j--;
            }
          }

          [newField[idx], newField[j]] = [newField[j], newField[idx]];

          Utils.Neighbors.updateNeighbors(idx, newField, size, 'dec');
          Utils.Neighbors.updateNeighbors(j, newField, size, 'inc');

          return newField;
        });
      }
    }

    if (cellValue === 0) {
      console.log('this is 0!');
    }

    // if (field[x * props.size + y] === -1 && !isFirstClick) {
    //   console.log('is bomb!');
    // }

    // let { x, y } = Utils.getCoordinates(i, field.length);
    // const neighbors = Utils.getNeighbors(x, y);
    setChecked(true);
  }

  return (
    <StyledCell cellValue={cellValue} isChecked={isChecked} onClick={checkCell} mark={mark} isMarked={isMarked}>
      {cellValue}
    </StyledCell>
  );
}
export default Cell;
