import { useState } from 'react'
import './App.css'

function App() {
  // Create a 7x6 board (7 columns, 6 rows)
  const [board, setBoard] = useState(Array(7).fill().map(() => Array(6).fill(null)));
  const [isRedTurn, setIsRedTurn] = useState(true);

  const handleColumnClick = (colIndex) => {
    // Copy the current board
    const newBoard = [...board];
    const column = [...newBoard[colIndex]];
    
    // Find the lowest empty cell in the column (first null value)
    const rowIndex = column.findIndex(cell => cell === null);
    
    // If column is full, do nothing
    if (rowIndex === -1) return;
    
    // Place the piece
    column[rowIndex] = isRedTurn ? 'red' : 'blue';
    newBoard[colIndex] = column;
    
    // Update board and switch turns
    setBoard(newBoard);
    setIsRedTurn(!isRedTurn);
  };

  return (
    <div className="connect4">
      <h1>Connect 4</h1>
      <div className="player-turn">
        {isRedTurn ? "Red's Turn" : "Blue's Turn"}
      </div>
      <div className="board">
        {board.map((column, colIndex) => (
          <div 
            key={colIndex} 
            className="column"
            onClick={() => handleColumnClick(colIndex)}
          >
            {column.map((cell, rowIndex) => (
              <div 
                key={rowIndex} 
                className={`cell ${cell}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
