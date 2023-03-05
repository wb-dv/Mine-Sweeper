import React from 'react';
import ReactDOM from 'react-dom/client';

import Game from './components/Game/Game';
import SyledGlobal from './StyledGlobal';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SyledGlobal />
    <Game size={16} bombAmount={40} />
  </React.StrictMode>
);

