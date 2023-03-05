import styled from 'styled-components';

const StyledBombField = styled.div`
  display: grid;
  grid-template-columns: repeat(${({ size }) => size || '16'}, 32px);

  border: 4px solid #7b7b7b;
  border-bottom-color: #fff;
  border-right-color: #fff;
`;

export default StyledBombField;
