import styled from 'styled-components';
import sprite from '../minesweeper_sprites.png';

const StyledSprite = styled.div`
  overflow: hidden;
  position: relative;

  background-image: url(${sprite});
  background-repeat: no-repeat;
  background-size: 278px;
`;

export default StyledSprite;
