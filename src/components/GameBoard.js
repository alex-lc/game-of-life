import React, { useState, useCallback, useRef } from 'react';
import produce from 'immer';

import '../styles/main.scss';

/* utils */
import { operations } from '../utils/operations.js';

/* number of rows and columns for game board */
const numRows = 25;
const numCols = 25;

/* generate an empty grid based on number of rows and cols */
const generateEmptyGrid = () => {
    // empty array for rows to be generated and appended to
    const rows = [];

    // interate through the number of rows, and create an array
    // with the number of columns defaulting to 0 values indicating
    // dead cells within the game board
    for (let i = 0; i < numRows; i++) {
        rows.push(Array.from(Array(numCols), () => 0))
    }

    return rows;
}

function GameBoard() {

    /* state for our game board's grid */
    const [grid, setGrid] = useState(() => {
        return generateEmptyGrid();
    });

    /* state for whether or not our game is running or not */
    const [running, setRunning] = useState(false);
    const runningRef = useRef();
    runningRef.current = running;

    /* running our simulation */
    const runSimulation = useCallback(() => {
        // if we are not running, then break / exit out of simulation
        if (!runningRef.current) {
            return;
        }

        setGrid((g) => {
            // use immer to create the next generation of cells, leaving
            // the previous generation untouched
            return produce(g, gridCopy => {
                // iterate through our rows and columns
                for (let i = 0; i < numRows; i++) {
                    for (let k = 0; k < numCols; k++) {
                        let neighbors = 0;

                        // iterate through our operations and determine neighbors
                        operations.forEach(([x, y]) => {
                            const newI = i + x;
                            const newK = k + y;

                            // if we haven't hit the borders of our game board, increase neighbor count
                            if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
                                neighbors += g[newI][newK]
                            }
                        })

                        // less than 2 neighbors, but greater than 3 neighbors?
                        // cell dies
                        if (neighbors < 2 || neighbors > 3) {
                            gridCopy[i][k] = 0;
                        }
                        // cell is dead and there are 3 live neighbors?
                        // cell becomes live
                        else if (g[i][k] === 0 && neighbors === 3) {
                            gridCopy[i][k] = 1
                        }
                    }
                }
            });
        });

        // game generations take half a second
        setTimeout(runSimulation, 500);
    }, []);

    return (
        <div className="container">
            <div className="game-board" style={{ display: "grid", gridTemplateColumns: `repeat(${numCols}, 20px)` }}>
                {grid.map((rows, i) =>
                    rows.map((col, k) => (
                        <div key={`${i}-${k}`}
                            onClick={() => {
                                const newGrid = produce(grid, gridCopy => {
                                    gridCopy[i][k] = grid[i][k] ? 0 : 1;
                                })
                                setGrid(newGrid);
                            }}
                            style={{
                                width: 20,
                                height: 20, backgroundColor: grid[i][k] ? "#14528f" : undefined,
                                border: "solid 1px #111111"
                            }}
                        />
                    ))
                )}
            </div>

            <div className="game-controls">
                <button onClick={() => {
                    setRunning(!running)
                    if (!running) {
                        runningRef.current = true;
                        runSimulation();
                    }
                }}>{running ? 'stop' : 'start'}</button>

                <button onClick={() => {
                    setGrid(generateEmptyGrid());
                }}>clear</button>

                <button onClick={() => {
                    const rows = [];
                    for (let i = 0; i < numRows; i++) {
                        rows.push(Array.from(Array(numCols), () => Math.random() > 0.7 ? 1 : 0));
                    }

                    setGrid(rows);
                }}>random</button>
            </div>
        </div>
    );
}

export default GameBoard;
