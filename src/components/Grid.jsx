import React from 'react';

const Grid = ({ grid, handleChange }) => {
  return (
    <div className="grid">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((value, colIndex) => (
            <input
              key={colIndex}
              type="text"
              maxLength="1"
              value={value === 0 ? '' : value}
              onChange={(e) => handleChange(e.target.value, rowIndex, colIndex)}
              className="cell"
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;
