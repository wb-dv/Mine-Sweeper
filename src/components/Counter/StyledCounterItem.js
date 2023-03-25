import styled, { css } from 'styled-components';
import StyledSprite from '../StyledSprite';

const StyledCounterItem = styled(StyledSprite)`
  width: 26px;
  height: 46px;
  ${({ value }) => css`
    background-position: ${coordinates[value]}px 0;
  `}
`;

const coordinates = [-28 * 9, 0, -28 * 1, -28 * 2, -28 * 3, -28 * 4, -28 * 5, -28 * 6, -28 * 7, -28 * 8];

export default StyledCounterItem;
