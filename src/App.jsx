import { useState } from 'react'
import './App.css'

function App() {
  // Create a 7x6 board (7 columns, 6 rows)
  const [board, setBoard] = useState(Array(7).fill().map(() => Array(6).fill(null)));

  return (
    <div className="connect4">
      <h1>Connect 4</h1>
      <div className="board">
        {board.map((column, colIndex) => (
          <div key={colIndex} className="column">
            {column.map((cell, rowIndex) => (
              <div key={rowIndex} className="cell">
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
