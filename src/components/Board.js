import React, { useState, useEffect } from 'react';
import Header from './Header';
import Cell from './Styles/Cell.styled';
import Container from './Styles/Container.styled';
import Button from './Styles/Button.styled';

const Board = () => {
  const n = 3; 

  const [cells, setCells] = useState(Array(n * n).fill(null));
  const [victory, setVictory] = useState(''); 
  const [currentPlayer, setCurrentPlayer] = useState('X'); // Track the current player
//for main container
  const styles = {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    verticalAlign: 'middle',
    justifyContent: 'center',
    alignItems: 'center',
    
    };
  //for main div 
  const divStyles ={
    display: 'flex',
    width: `${n* 80}px`,
    justifyContent: 'space-between',
    marginTop: '20px'
  } 
  //for highlighting the div to represent the currentPlayer
  const player1Styles = {
    backgroundColor: currentPlayer === 'X' ? 'teal' : '#c0c2c4',
    color: 'white',
    padding: '10px',
    fontSize: '15px',
    fontWeight: 'bold',
    borderRadius: '5px',
  };
  
  const player2Styles = {
    border: currentPlayer === 'O' ? '1px solid black' : '1px solid #c0c2c4',
    padding: '10px',
    fontSize: '15px',
    fontWeight: 'bold',
    borderRadius: '5px',
    backgroundColor: currentPlayer === 'O' ? 'white' : '#c0c2c4',
  }; 
  useEffect(() => {
    function checkWinner() {
      const combos = getWinningCombinations(n);
      for (const combination of combos) {
        const [index, ...rest] = combination;
        const firstCellValue = cells[index];
        if (firstCellValue !== null) {
          const isWinningCombination = rest.every((cell) => cells[cell] === firstCellValue);
          if (isWinningCombination) {
            setVictory(firstCellValue);
            return;
          }
        }
      }
      setVictory('');
    }
    checkWinner();
  }, [cells]);

  const handleClick = (index) => {
    if (cells[index] === null && victory === '') {
      const newCells = [...cells];
      newCells[index] = currentPlayer;
      setCells(newCells);
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X'); // Toggle player turn
    }
  };

  const getWinningCombinations = (n) => {
    const combos = [];

    // Rows and columns
    for (let i = 0; i < n; i++) {
      const row = [];
      const col = [];
      for (let j = 0; j < n; j++) {
        row.push(i * n + j); // Index for row
        col.push(i + j * n); // Index for column
      }
      combos.push(row);
      combos.push(col);
    }

    // Diagonals
    const diagonal1 = [];
    const diagonal2 = [];
    for (let i = 0; i < n; i++) {
      diagonal1.push(i * n + i); // Main diagonal
      diagonal2.push((i + 1) * n - (i + 1)); // Anti-diagonal
    }
    combos.push(diagonal1);
    combos.push(diagonal2);

    return combos;
  };
  // Reset handler
  const reset = ()=>{
    let newCells = Array(n*n).fill(null);
    setCells(newCells);
    setVictory('');
    setCurrentPlayer('X');
  }

  return (
    <div className="container">
      <Header />
      <div style={styles} className="board">
      <div style={{ display: 'flex', justifyContent: 'flex-start', width: `${n * (80)}px`, marginBottom:'10px', }}>
        <Button onClick={reset}>↺</Button>
      </div>

      <Container size={n}>
          {cells.map((cell, index) => (
            <Cell key={index} cell={cell} onClick={() => handleClick(index)}>
              {cell}
            </Cell>
          ))}
      </Container>
      <div className='player' style={divStyles}>
      <div style={player1Styles}>
            Player 1
      </div>
      <div  style={player2Styles}>
            Player 2
      </div>
      </div>    
          
          <div style={styles}>
            { victory !== '' ? (victory === 'X' ? (
              <h1 style={{color: "#47ed65"}}>{'Player 1 won'}</h1>
            ) : (
              <h1 style={{color: "#f04a30"}}>{'Player 2 won'}</h1>
            )): (cells.includes(null) ? <></> : <h1>oops a tie!</h1>)
            }
          </div>
      </div>
    </div> 
  );
};
export default Board;
