import React from 'react';
import ReactDOM from 'react-dom/client';

import Game from './components/Game/Game';
import SyledGlobal from './StyledGlobal';
import { Utils } from './Utils';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SyledGlobal />
    <Game size={Utils.params.size} bombAmount={Utils.params.bombAmount} />
  </React.StrictMode>
);

