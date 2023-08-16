import "./App.css";
import Grid from "./components/grid";
import { useState } from "react";
import { isValid, wait } from "./utils";

function App() {
  const [grid, setGrid] = useState<number[][]>([
    [8, 0, 0, 0, 0, 0, 7, 0, 6],
    [0, 7, 0, 6, 0, 4, 0, 0, 0],
    [0, 6, 2, 0, 0, 0, 0, 9, 0],
    [0, 0, 0, 0, 0, 5, 0, 0, 8],
    [0, 0, 5, 0, 1, 0, 0, 0, 0],
    [0, 9, 0, 8, 0, 7, 0, 0, 0],
    [6, 0, 0, 0, 0, 0, 2, 0, 0],
    [0, 0, 0, 7, 0, 0, 0, 4, 0],
    [0, 0, 0, 0, 8, 0, 6, 0, 7],
  ]);
  const [isSolving, setIsSolving] = useState<boolean>(false);
  const [activeCell, setActiveCell] = useState<number[] | null>(null); // [row, col]
  const [status, setStatus] = useState<string>("");
  const [speed, setSpeed] = useState<number>(1);
  const solve = async (
    grid: number[][],
    r: number,
    c: number
  ): Promise<boolean> => {
    await wait(speed);
    setGrid(grid);
    setActiveCell([r, c]);
    // if we are at the very end return true
    if (r === 9) {
      setGrid(grid);
      return true;
    }
    // if we're at the end of the col move on to the next row
    else if (c === 9) {
      return solve(grid, r + 1, 0);
    }
    // if it's pre-filled move on
    else if (grid[r][c] !== 0) {
      setStatus(`Skipping ${grid[r][c]}`);
      return solve(grid, r, c + 1);
    } else {
      // if it is not pre-filled
      for (let k = 1; k <= 9; k++) {
        setStatus(`Trying ${k}`);
        if (isValid(grid, r, c, k)) {
          grid[r][c] = k;
          // then continue solving
          if (await solve(grid, r, c + 1)) {
            return true;
          }
          setStatus(`not possible to put ${k} here`);
          // if it's not possible change the num back to 0 and then retry
          setActiveCell([r, c]);
          grid[r][c] = 0;
        }
      }
      setGrid(grid);
      return false;
    }
  };

  const handleSolveClick = async () => {
    if (isSolving) return;
    setIsSolving(true);
    if (!(await solve(grid, 0, 0))) {
      setStatus("No Solution Found");
    } else {
      setStatus("Solved");
    }
    setActiveCell(null);
    setIsSolving(false);
  };

  return (
    <main>
      <h1>Sudoku Solver</h1>
      <button onClick={handleSolveClick}>Start Solve</button>
      <p>{status}</p>
      <Grid sudokuGrid={grid} activeCell={activeCell} />
    </main>
  );
}

export default App;