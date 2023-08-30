// import React from 'react';
// import { useState , useEffect } from 'react';
// import Header from './Header';
// import Cell from './Styles/Cell.styled';
// import Container from './Styles/Container.styled';
// import Button from './Styles/Button.styled';

// const Board =()=>{
// let n = 3;

// const [cells, setCells] = useState(Array(n*n).fill(null)) ; //board of n*n cells
// const [click1, setClick1] = useState(true); //clicked by player 1
// const [click2, setClick2] = useState(false); //clicked by player 2
// const [status, setStatus] = useState(""); // to find if it is X or O
// const [victory, setVictory] = useState("");
//  //click handler for player button
//  const handleClick1 = () =>{
    
//     if(status === 'O'){
//         setClick1(true);
//         setClick2(false);
//     }
//  }

//  const handleClick2 = () =>{
    
//     if(status === 'X'){
//         setClick2(true);
//         setClick1(false);
//     } 
//  }
// //click handler for cell
// const handleCellClick = (index)=>{
//     if(cells[index] == null){
//         if(click1 && (status === "" || status === "O")){
//             cells[index] = 'X';
//             setStatus('X')

//         }else if(click2 && (status === "" || status === "X")) {
//             cells[index] = 'O';
//             setStatus('O');
//         }
//     }

// }
// //winning combinations
// function combo(n) {
//     let arr = [];
//     let j = 0;
    
//     //rows
//     for(let i = 0; i< n*n && arr.length < (2*n+2); i++){
//         let row = [];
//         let col = [];
//         for(j; row.length < n; j++ ){
//             row.push(j);
//         }
//         arr.push(row);

//     //columns
//         for(let k = i; col.length <n ; k= k+n){
//             col.push(k);
//         }
//         arr.push(col);

//     //diagonals
//     if(i < 2){
//         let diag = [];
//         let d = 0;
//         for(d ; diag.length< n ; d = d+n+1){
//             diag.push(d);
//         }
//         arr.push(diag);
//         d = n-1;
//     }
//     }  
//     return arr;
// }
// const combinations = combo(n);
// function checkWinner (){
//     for( let i = 0; i < combinations.length ; i++){
//         let index = combinations[i][0];
//         let count = 0;
//       for( var j = 0; j < n; j++){
//         let temp = combinations[i][j];
//             if(cells[index] !== cells[temp]){
//                 break;
//             }
//             count += 1;
//       }
//       console.log(count)
//       if( count === n){
//         let ind = 0;
//         setVictory(`${cells[index]}`)
//         // while(i <combinations.length){
//         //    cells[combinations[ind]] = 'W';
//         //    ind++;
//         // }
        
//         return combinations[i];
//     }
//     }
//     return null;
// }
// const winner = checkWinner();

// 
// console.log("arr",combinations);
//     return(
//         <div className="container">
//             <Header/>
//             <div className= "board" style={styles}>
//                 <Container size = {n}>
//                     {cells.map((cell , index) =>(
//                         <Cell  cell={cell} onClick={()=>handleCellClick(index)}>{cell}</Cell>  
//                     ))}
//                     <Button click = {click1} onClick={handleClick1} >
//                         {
//                             victory === "" ? <h2>Player 1</h2> : (victory === "X" ? <h2 style={{backgroundColor : '#147ce3'}}>Winner</h2> : <h2 style={{backgroundColor : '#b3adad'}}>Loser</h2>) 
//                         }
//                     </Button>
//                     <Button click = {click2} onClick={handleClick2} >
//                         {
//                             victory === "" ? <h2>Player 2</h2> : (victory === "O" ? <h2 style={{backgroundColor : '#147ce3'}}>Winner</h2> : <h2 style={{backgroundColor : '#b3adad'}}>Loser</h2>) 
//                         }
//                     </Button>
//                 </Container>
//             </div>

//         </div>
//     )
// }
// export default Board;


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

  const styles = {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    verticalAlign: 'middle',
    justifyContent: 'center',
    alignItems: 'center',
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
      const newCells = [...cells]; // Create a copy of cells array

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
  // play again handler
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
        <Container size={n}>
          {cells.map((cell, index) => (
            <Cell cell={cell} onClick={() => handleClick(index)}>
              {cell}
            </Cell>
          ))}
          <Button currentPlayer = {currentPlayer === 'X'} disabled={currentPlayer === 'O'} onClick={() => setCurrentPlayer('O')}>
            <h2>Player 1</h2>
          </Button>
          <Button currentPlayer = {currentPlayer === 'O'} disabled={currentPlayer === 'X'} onClick={() => setCurrentPlayer('X')}>
            <h2>Player 2</h2>
          </Button>
          <Button style={{backgroundColor: "#0e5beb"}} onClick={reset}>
            <h2>Reset</h2>
          </Button>
          </Container>
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
