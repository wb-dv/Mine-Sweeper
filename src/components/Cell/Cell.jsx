import { useContext, useEffect, useState } from 'react';
import { Utils } from '../../Utils';
import { ContextGame } from '../Game/ContextGame';

import StyledCell from './StyledCell';

function Cell(props) {
  const { useField, useCheckedCells, idx, cellValue, size } = props;

  const [isChecked, setChecked] = useState(false);
  const [mark, setMark] = useState(0);
  const [isMarked, setIsMarked] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const [field, setField] = useField;
  const [checkedCells, setCheckedCells] = useCheckedCells;

  const { isFirstClick, setFirstClick, setRemainingBomb } = useContext(ContextGame);

  function checkCell(e) {
    if (isChecked || e.nativeEvent.button === 2 || isMarked) return e.preventDefault();

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

          newField[j] = newField[idx];
          newField[idx] = Utils.Neighbors.getAmountNeighborsBomb(idx, newField, size);

          Utils.Neighbors.updateNeighbors(idx, newField, size, 'dec');
          Utils.Neighbors.updateNeighbors(j, newField, size, 'inc');

          return newField;
        });
      }
    }

    if (cellValue === 0) {
      console.log(cellValue);
    }

    // if (field[x * props.size + y] === -1 && !isFirstClick) {
    //   console.log('is bomb!');
    // }

    // let { x, y } = Utils.getCoordinates(i, field.length);
    // const neighbors = Utils.getNeighbors(x, y);
    setCheckedCells((prevChecked) => [...prevChecked, idx]);
    setChecked(true);
  }

  function mouseDownHandler(e) {
    e.preventDefault();
    controlMarkStates(e);
    setIsPressed(true);
  }

  function mouseUpHandler(e) {
    e.preventDefault();
    unMark(e);
    setIsPressed(false);
  }

  function controlMarkStates(e) {
    if (isChecked) return;
    if (e.nativeEvent.button === 2) {
      if (!isMarked) setIsMarked(true);
      if (mark === 0) {
        setRemainingBomb((prev) => --prev);
        setMark(1);
        return;
      }
      if (mark === 1) {
        setRemainingBomb((prev) => ++prev);
        setMark(2);
        return;
      }
      if (mark === 2) return setMark(0);
    }
  }

  function unMark(e) {
    if (isChecked) return;
    if (e.nativeEvent.button === 2 && mark === 0) {
      setIsMarked(false);
    }
  }

  return (
    <StyledCell
      cellValue={cellValue}
      isChecked={isChecked}
      onClick={checkCell}
      onMouseDown={mouseDownHandler}
      onMouseUp={mouseUpHandler}
      onContextMenu={(e) => e.preventDefault()}
      mark={mark}
      isMarked={isMarked}
      isPressed={isPressed}
    >
      {cellValue}
    </StyledCell>
  );
}
export default Cell;
