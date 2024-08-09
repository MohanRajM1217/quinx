import React, { useState } from 'react';
import Grid from './Grid';
import Validation from './Validation';
import Hint from './Hint';

const emptyGrid = Array(9).fill().map(() => Array(9).fill(0));

const SudokuSolver = () => {
  const [grid, setGrid] = useState(emptyGrid);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [hint, setHint] = useState(null);

  const handleChange = (value, row, col) => {
    const newGrid = [...grid];
    const parsedValue = parseInt(value);
    if (isNaN(parsedValue) || parsedValue < 1 || parsedValue > 9) {
      newGrid[row][col] = 0;
    } else {
      newGrid[row][col] = parsedValue;
    }
    setGrid(newGrid);
    setError('');
    setSuccess('');
  };

  const validateGrid = () => {
    if (Validation(grid)) {
      setError('');
      setSuccess('The Sudoku puzzle is valid!');
      return true;
    } else {
      setError('Invalid Sudoku puzzle. Ensure no duplicate numbers in rows, columns, or 3x3 subgrids.');
      setSuccess('');
      return false;
    }
  };

  const solveSudoku = (grid) => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col] === 0) {
          for (let num = 1; num <= 9; num++) {
            if (isValidMove(grid, row, col, num)) {
              grid[row][col] = num;
              if (solveSudoku(grid)) {
                return true;
              }
              grid[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  };

  const isValidMove = (grid, row, col, num) => {
    for (let x = 0; x < 9; x++) {
      if (grid[row][x] === num || grid[x][col] === num ||
        grid[Math.floor(row / 3) * 3 + Math.floor(x / 3)]
        [Math.floor(col / 3) * 3 + x % 3] === num) {
        return false;
      }
    }
    return true;
  };

  const handleSolve = () => {
    if (validateGrid()) {
      const newGrid = JSON.parse(JSON.stringify(grid));
      if (solveSudoku(newGrid)) {
        setGrid(newGrid);
        setError('');
        setSuccess('Sudoku puzzle solved successfully!');
      } else {
        setError('This Sudoku puzzle is not solvable.');
        setSuccess('');
      }
    }
  };

  const handleReset = () => {
    setGrid(emptyGrid);
    setError('');
    setSuccess('');
    setHint(null);
  };

  const handleHint = () => {
    const newHint = Hint(grid);
    if (newHint) {
      const newGrid = [...grid];
      newGrid[newHint.row][newHint.col] = newHint.value;
      setGrid(newGrid);
      setError('');
      setSuccess(`Hint: Placed ${newHint.value} at row ${newHint.row + 1}, column ${newHint.col + 1}.`);
    } else {
      setError('No hints available!');
      setSuccess('');
    }
  };

  return (
    <div className="sudoku-solver">
      <h1>Sudoku Solver</h1>
      <Grid grid={grid} handleChange={handleChange} />
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
      <div className="buttons">
        <button onClick={validateGrid}>Validate</button>
        <button onClick={handleSolve}>Solve</button>
        <button onClick={handleReset}>Reset</button>
        <button onClick={handleHint}>Hint</button>
      </div>
    </div>
  );
};

export default SudokuSolver;
