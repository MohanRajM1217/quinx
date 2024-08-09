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
  
  const Hint = (grid) => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col] === 0) {
          for (let num = 1; num <= 9; num++) {
            if (isValidMove(grid, row, col, num)) {
              return { row, col, value: num };
            }
          }
        }
      }
    }
    return null;
  };
  
  export default Hint;
  