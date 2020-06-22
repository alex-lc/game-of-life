import React, { useState, useCallback, useRef } from 'react';
import produce from 'immer';

import './styles/main.scss';

/* components */
import GameBoard from './components/GameBoard.js';

function App() {
  return (
    <div className="container">
      <GameBoard />
    </div>
  );
}

export default App;
