import { useContext, useEffect, useState } from 'react';
import { Utils } from '../../Utils';
import { ContextGame } from '../Game/ContextGame';

import StyledCell from './StyledCell';

function Cell({ idx, cellValue, size, setField, checkedCells, setCheckedCells, setMarkedBombCounter }) {
  const [isChecked, setChecked] = useState(false);
  const [mark, setMark] = useState(0);
  const [isMarked, setIsMarked] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const { isFirstClick, setFirstClick, setRemainingBomb, setGameOver, isGameOver } = useContext(ContextGame);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(markingBomb, [isMarked, mark]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(checkedOrNotChecked, [isGameOver, checkedCells]);

  function checkCell(e) {
    if (isChecked || e.nativeEvent.button === 2 || isMarked) return e.preventDefault();

    setCheckedCells((prevChecked) => {
      if (prevChecked.includes(idx)) return prevChecked;
      return [...prevChecked, idx];
    });

    if (isFirstClick) {
      setFirstClick(false);

      if (cellValue !== 0) {
        replaceWithZeroOnFirstClick(idx);
      }

      return;
    }

    if (cellValue === Utils.params.bomb) {
      setField((prevField) => {
        const newField = [...prevField];

        newField[idx] = -2;

        return newField;
      });

      setGameOver('loose');
    }
  }

  function replaceWithZeroOnFirstClick(idx) {
    setField((oldField) => {
      const newField = [...oldField];

      if (newField[idx] === Utils.params.bomb) {
        let futuredBomb = Utils.findNotBomb(newField);

        newField[futuredBomb] = newField[idx];

        Utils.Neighbors.updateNeighbors(idx, newField, 'dec');
        Utils.Neighbors.updateNeighbors(futuredBomb, newField, 'inc');
      }

      newField[idx] = 0;

      const neighborsIdx = Utils.Neighbors.getNeighborsIndexes(idx);

      neighborsIdx.forEach((nIdx) => {
        if (newField[nIdx] === Utils.params.bomb) {
          let futuredBomb = Utils.findNotBomb(newField);

          newField[futuredBomb] = newField[nIdx];
          newField[nIdx] = Utils.Neighbors.getAmountNeighborsBomb(nIdx, newField);

          Utils.Neighbors.updateNeighbors(nIdx, newField, 'dec');
          Utils.Neighbors.updateNeighbors(futuredBomb, newField, 'inc');
        }
      });

      return newField;
    });
  }

  function mouseDownHandler(e) {
    e.preventDefault();

    controlMarkStates(e);

    setIsPressed(true);
  }

  function mouseUpHandler(e) {
    e.preventDefault();
    setIsPressed(false);
  }

  function controlMarkStates(e) {
    if (isChecked) return;
    if (e.nativeEvent.button === 2) {
      if (!isMarked) setIsMarked(true);
      switch (mark) {
        case 0:
          setMark(1);
          if (cellValue === Utils.params.bomb) {
            setMarkedBombCounter((count) => count + 1);
          }
          break;
        case 1:
          setMark(2);
          if (cellValue === Utils.params.bomb) {
            setMarkedBombCounter((count) => count - 1);
          }
          break;
        case 2:
          setMark(0);
          setIsMarked(false);
          if (checkedCells.includes(idx)) {
            setCheckedCells((prevCheckedCells) => prevCheckedCells.filter((el) => el !== idx));
          }
          break;
        default:
      }
    }
  }

  function setCheckedNeighbours(i) {
    setCheckedCells((prev) => {
      let neighborsIdxs = Utils.Neighbors.getNeighborsIndexes(i).filter((idx) => !prev.includes(idx));

      return [...prev, ...neighborsIdxs];
    });
  }

  function checkedOrNotChecked() {
    if (isGameOver === 'loose' && !isChecked) {
      if (cellValue === Utils.params.bomb && !isMarked) {
        setChecked(true);
        return;
      }

      if (cellValue !== Utils.params.bomb && mark === 1 && !checkedCells.includes(idx)) {
        setIsMarked(false);
        setChecked(true);

        setField((prevField) => {
          const newField = [...prevField];
          newField[idx] = -3;
          return newField;
        });
        return;
      }
    }

    if (!isMarked && !isChecked && checkedCells.includes(idx)) {
      if (cellValue === 0) {
        setCheckedNeighbours(idx, size);
      }
      setChecked(true);
    }
  }

  function markingBomb() {
    if (!isMarked) return;
    if (mark === 1) return setRemainingBomb((prev) => prev - 1);
    if (mark === 2) return setRemainingBomb((prev) => prev + 1);
  }

  const eventHandlers = {
    onClick: isGameOver ? () => {} : checkCell,
    onMouseDown: isGameOver ? () => {} : mouseDownHandler,
    onMouseUp: isGameOver ? () => {} : mouseUpHandler,
  };

  return <StyledCell cellValue={cellValue} isChecked={isChecked} mark={mark} isMarked={isMarked} isPressed={isPressed} {...eventHandlers} onContextMenu={(e) => e.preventDefault()} />;
}
export default Cell;
