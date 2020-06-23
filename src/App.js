import React, { useState, useCallback, useRef } from 'react';
import { useSpring, animated } from 'react-spring';

import './styles/main.scss';

/* components */
import GameBoard from './components/GameBoard.js';

function App() {

  const props = useSpring({ opacity: 1, from: { opacity: 0 } });

  return (
    <animated.div style={props} className="container">
      <h1>Conway's Game of Life</h1>
      <GameBoard />
    </animated.div>
  );
}

export default App;
