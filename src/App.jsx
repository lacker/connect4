import { useState, useEffect } from 'react'
import './App.css'

function App() {
  // Create a 7x6 board (7 columns, 6 rows)
  const [board, setBoard] = useState(Array(7).fill().map(() => Array(6).fill(null)));
  const [isRedTurn, setIsRedTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);

  // Check if a player has won or if it's a draw after each move
  useEffect(() => {
    const checkWinner = () => {
      const currentColor = isRedTurn ? 'blue' : 'red'; // We check for the color that just played
      
      // Check horizontal wins
      for (let col = 0; col <= 3; col++) {
        for (let row = 0; row < 6; row++) {
          if (
            board[col][row] === currentColor &&
            board[col + 1][row] === currentColor &&
            board[col + 2][row] === currentColor &&
            board[col + 3][row] === currentColor
          ) {
            return currentColor;
          }
        }
      }
      
      // Check vertical wins
      for (let col = 0; col < 7; col++) {
        for (let row = 0; row <= 2; row++) {
          if (
            board[col][row] === currentColor &&
            board[col][row + 1] === currentColor &&
            board[col][row + 2] === currentColor &&
            board[col][row + 3] === currentColor
          ) {
            return currentColor;
          }
        }
      }
      
      // Check diagonal wins (bottom-left to top-right)
      for (let col = 0; col <= 3; col++) {
        for (let row = 0; row <= 2; row++) {
          if (
            board[col][row] === currentColor &&
            board[col + 1][row + 1] === currentColor &&
            board[col + 2][row + 2] === currentColor &&
            board[col + 3][row + 3] === currentColor
          ) {
            return currentColor;
          }
        }
      }
      
      // Check diagonal wins (top-left to bottom-right)
      for (let col = 0; col <= 3; col++) {
        for (let row = 3; row < 6; row++) {
          if (
            board[col][row] === currentColor &&
            board[col + 1][row - 1] === currentColor &&
            board[col + 2][row - 2] === currentColor &&
            board[col + 3][row - 3] === currentColor
          ) {
            return currentColor;
          }
        }
      }
      
      return null;
    };
    
    const checkDraw = () => {
      // Check if all cells are filled (no null values in any column)
      return board.every(column => column.every(cell => cell !== null));
    };
    
    const winningColor = checkWinner();
    if (winningColor) {
      setWinner(winningColor);
    } else if (checkDraw()) {
      setIsDraw(true);
    }
  }, [board, isRedTurn]);

  const handleColumnClick = (colIndex) => {
    // If there's already a winner or a draw, don't allow more moves
    if (winner || isDraw) return;
    
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

  const resetGame = () => {
    setBoard(Array(7).fill().map(() => Array(6).fill(null)));
    setIsRedTurn(true);
    setWinner(null);
    setIsDraw(false);
  };

  return (
    <div className="connect4">
      <h1>Connect 4</h1>
      {winner ? (
        <div className="winner-message">
          <div className={`winner-text ${winner}`}>
            {winner.charAt(0).toUpperCase() + winner.slice(1)} wins!
          </div>
          <button onClick={resetGame} className="reset-button">
            Play Again
          </button>
        </div>
      ) : isDraw ? (
        <div className="winner-message">
          <div className="winner-text draw">
            It's a draw!
          </div>
          <button onClick={resetGame} className="reset-button">
            Play Again
          </button>
        </div>
      ) : (
        <div className="player-turn">
          {isRedTurn ? "Red's Turn" : "Blue's Turn"}
        </div>
      )}
      <div className="board" tabIndex="-1">
        {board.map((column, colIndex) => (
          <div 
            key={colIndex} 
            className="column"
            onClick={() => handleColumnClick(colIndex)}
            tabIndex="-1"
          >
            {column.map((cell, rowIndex) => (
              <div 
                key={rowIndex} 
                className={`cell ${cell}`}
                tabIndex="-1"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
