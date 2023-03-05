import styled, { css } from 'styled-components';
import StyledSprite from '../StyledSprite';

const StyledCell = styled(StyledSprite)`
  width: 32px;
  height: 32px;

  ${({ isChecked, cellValue, isMarked, mark, isPressed }) => {
    if (isMarked) {
      return css`
        background-position: ${-34 * (mark + 1)}px calc(100% + 34px);
      `;
    } else if (isChecked) {
      return css`
        background-position: ${checkedCoordinates[cellValue][0]}px ${checkedCoordinates[cellValue][1]};
        &&:nth-child(-n + 16)::after {
          content: '';
          display: block;
          height: 5px;

          position: absolute;
          top: 0;
          right: 0;
          left: 3px;

          background-color: #c0c0c0;
        }

        &&:first-child::after {
          left: 0;
        }

        &&:nth-child(16n + 1)::before {
          content: '';
          display: block;
          width: 4px;

          position: absolute;
          top: 2px;
          bottom: 0;
          left: 0;

          background-color: #c0c0c0;
        }
      `;
    } else {
      return css`
        background-position: 0 calc(100% + 34px);
        ${isPressed && `background-position: -34px calc(100% + 34px);`};
      `;
    }
  }}
`;

const checkedCoordinates = {
  '-1': [-34 * 5, 'calc(100% + 34px)'],
  0: [-34, 'calc(100% + 34px)'],
  1: [0, '100%'],
  2: [-34, '100%'],
  3: [-34 * 2, '100%'],
  4: [-34 * 3, '100%'],
  5: [-34 * 4, '100%'],
  6: [-34 * 5, '100%'],
  7: [-34 * 6, '100%'],
  8: [-34 * 7, '100%'],
  9: [-34 * 2, 'calc(100% + 34px)'],
  10: [-34 * 3, 'calc(100% + 34px)'],
};

export default StyledCell;
