const isValidRow = (grid, row) => {
    const seen = new Set();
    for (let i = 0; i < 9; i++) {
      if (grid[row][i] !== 0) {
        if (seen.has(grid[row][i])) return false;
        seen.add(grid[row][i]);
      }
    }
    return true;
  };
  
  const isValidCol = (grid, col) => {
    const seen = new Set();
    for (let i = 0; i < 9; i++) {
      if (grid[i][col] !== 0) {
        if (seen.has(grid[i][col])) return false;
        seen.add(grid[i][col]);
      }
    }
    return true;
  };
  
  const isValidSubgrid = (grid, startRow, startCol) => {
    const seen = new Set();
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        const value = grid[row + startRow][col + startCol];
        if (value !== 0) {
          if (seen.has(value)) return false;
          seen.add(value);
        }
      }
    }
    return true;
  };
  
  const Validation = (grid) => {
    for (let i = 0; i < 9; i++) {
      if (!isValidRow(grid, i) || !isValidCol(grid, i)) {
        return false;
      }
    }
    for (let row = 0; row < 9; row += 3) {
      for (let col = 0; col < 9; col += 3) {
        if (!isValidSubgrid(grid, row, col)) {
          return false;
        }
      }
    }
    return true;
  };
  
  export default Validation;
  