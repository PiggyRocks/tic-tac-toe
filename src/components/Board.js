import React from 'react';
import { useState , useEffect } from 'react';
import Header from './Header';
import Cell from './Styles/Cell.styled';
import Container from './Styles/Container.styled';
import Button from './Styles/Button.styled';

const Board =()=>{
let n = 3;

const [cells, setCells] = useState(Array(n*n).fill(null)) ; //board of n*n cells
const [click1, setClick1] = useState(true); //clicked by player 1
const [click2, setClick2] = useState(false); //clicked by player 2
const [status, setStatus] = useState(""); // to find if it is X or O
const [victory, setVictory] = useState("");
const [combinations,setCombinations] = useState([]);
 //click handler for player button
 const handleClick1 = () =>{
    
    if(status === 'O'){
        setClick1(true);
        setClick2(false);
    }
 }

 const handleClick2 = () =>{
    
    if(status === 'X'){
        setClick2(true);
        setClick1(false);
    } 
 }
//click handler for cell
const handleCellClick = (index)=>{
    if(cells[index] == null){
        if(click1 && (status === "" || status === "O")){
            cells[index] = 'X';
            setStatus('X')

        }else if(click2 && (status === "" || status === "X")) {
            cells[index] = 'O';
            setStatus('O');
        }
    }

}
//winning combinations
useEffect(()=>{
    function combo() {
        let arr = [];
        let j = 0;
        
        //rows
        for(let i = 0; i< n*n && arr.length < (2*n+2); i++){
            let row = [];
            let col = [];
            for(j; row.length < n; j++ ){
                row.push(j);
            }
            arr.push(row);
    
        //columns
            for(let k = i; col.length <n ; k= k+n){
                col.push(k);
            }
            arr.push(col);
    
        //diagonals
        if(i < 2){
            let diag = [];
            let d = 0;
            for(d ; diag.length< n ; d = d+n+1){
                diag.push(d);
            }
            arr.push(diag);
            d = n-1;
        }
        } 
        setCombinations(arr);
        return arr;
    }
},[])


function checkWinner (){
    for( let i = 0; i < combinations.length ; i++){
        let index = combinations[i][0];
        let count = 0;
      for( var j = 0; j < n; j++){
        let temp = combinations[i][j];
            if(cells[index] !== cells[temp]){
                break;
            }
            count += 1;
      }
      console.log(count)
      if( count === n){
        let ind = 0;
        setVictory(`${cells[index]}`)
        while(i <combinations.length){
           cells[combinations[ind]] = 'W';
           ind++;
        }
        
        return combinations[i];
    }
    }
    return null;
}
const winner = checkWinner();

const styles = {
    display: 'flex',
    textAlign: 'center',
    verticalAlign: 'middle',
    justifyContent: 'center',
    alignItems: 'center',
};
console.log("arr",combinations);
    return(
        <div className="container">
            <Header/>
            <div className= "board" style={styles}>
                <Container size = {n}>
                    {cells.map((cell , index) =>(
                        <Cell  cell={cell} onClick={()=>handleCellClick(index)}>{cell}</Cell>  
                    ))}
                    <Button click = {click1} onClick={handleClick1} >
                        {
                            victory === "" ? <h2>Player 1</h2> : (victory === "X" ? <h2 style={{backgroundColor : '#147ce3'}}>Winner</h2> : <h2 style={{backgroundColor : '#b3adad'}}>Loser</h2>) 
                        }
                    </Button>
                    <Button click = {click2} onClick={handleClick2} >
                        {
                            victory === "" ? <h2>Player 2</h2> : (victory === "O" ? <h2 style={{backgroundColor : '#147ce3'}}>Winner</h2> : <h2 style={{backgroundColor : '#b3adad'}}>Loser</h2>) 
                        }
                    </Button>
                </Container>
            </div>

        </div>
    )
}
export default Board;