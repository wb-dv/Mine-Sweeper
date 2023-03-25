import styled, { css } from 'styled-components';
import StyledSprite from '../StyledSprite';

const StyledSmileButton = styled(StyledSprite)`
  width: 52px;
  height: 52px;

  &:active {
    background-position: -54px -48px;
  }

  ${({ value }) => css`
    background-position: ${coordinates[value]}px -48px;
  `}
`;

const coordinates = [0, -54 * 1, -54 * 2, -54 * 3, -54 * 4];

export default StyledSmileButton;
