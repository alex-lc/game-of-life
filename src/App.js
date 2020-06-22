import React, { useState } from 'react';

import './styles/main.scss';

/* data source */
import {data} from './utils/data.js';

/* components */
import Cell from './components/Cell.js';

function App() {

  const [cells, setCells] = useState([data]);
  
  return (
    <div className="container">
      <div className="game-board">
        {console.log(data)}
        {cells.map((cell, idx) => {
          return (
            <Cell key={idx} />
          )
        })}
      </div>
    </div>
  );
}

export default App;
