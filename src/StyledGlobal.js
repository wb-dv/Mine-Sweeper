import { createGlobalStyle } from 'styled-components';

const SyledGlobal = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    background-color: #888888;
}

button {
  border: none;

  &:active,
  &:focus {
    outline: none;
  }
}
`;

export default SyledGlobal;
