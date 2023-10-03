import { useEffect, useState } from 'react';

function Board() {
  let computerPlace;
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [currentMove, setCurrentMove] = useState(0);
  const [result, setResult] = useState("");
  const xIsNext = currentMove % 2 === 0;

  useEffect(()=>{
    calculateWinner(squares); 
  },[squares])

  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    if (xIsNext) {
      squares[i] = 'X';
    }
    setSquares(squares)
    computerTurn(squares)
  }

  function computerTurn() {
    computerPlace = Math.floor(Math.random() * 9)
    let nextSquares = [...squares]
    if(currentMove==0){
      nextSquares.forEach((element,ind) => {
        if(element == null){
           nextSquares[computerPlace] = 'O'
          }
      });
    }
    else {
      const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
      let nullPositionsArr = []
      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[c] == null){
          nextSquares[c]='O'
          setSquares(nextSquares)
          return;
        }
        else if (squares[a] && squares[a] === squares[c] && squares[b] == null){
          nextSquares[b]='O'
          setSquares(nextSquares)
          return;
        }
        else if (squares[b] && squares[b] === squares[c] && squares[a] == null){
          nextSquares[a]='O'
          setSquares(nextSquares)
          return;
        }
      }
      nextSquares.forEach((el,i)=>{
        if(el==null) nullPositionsArr.push(i)
      })
      let randomPosition = nullPositionsArr[(Math.floor(Math.random() * nullPositionsArr.length))]
      nextSquares[randomPosition]='O'
      if(nullPositionsArr.length == 0){
        setResult("It's a Tie")
      } 
      setSquares(nextSquares)
      setCurrentMove(currentMove+2); 
    }
    let moves = currentMove+2
    setSquares(nextSquares)
    setCurrentMove(moves);
  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        if (squares[a] == 'X') {
          setResult('You Won')
        }
        else if (squares[a] == 'O') {
          setResult('You Lose')
        }
      }
    }
  }

  function playAgain(){
    setSquares(Array(9).fill(null))
    setResult("")
  }
  return (
    <>
    <h1>Tic Tac Toe</h1>
    <div>
      <span className='winloss'>{result}</span>
    </div>
    <div className="board">
      <div className="square top left" onClick={() => handleClick(0)}>
        <span className='cross'>{squares[0]}</span>
      </div>
      <div className="square top" onClick={() => handleClick(1)}>
        <span className='cross'>{squares[1]}</span>
      </div>
      <div className="square top right" onClick={() => handleClick(2)}>
        <span className='cross'>{squares[2]}</span>
      </div>
      <div className="square left" onClick={() => handleClick(3)}>
        <span className='cross'>{squares[3]}</span>
      </div>
      <div className="square" onClick={() => handleClick(4)}>
        <span className='cross'>{squares[4]}</span>
      </div>
      <div className="square right" onClick={() => handleClick(5)}>
        <span className='cross'>{squares[5]}</span>
      </div>
      <div className="square bottom left" onClick={() => handleClick(6)}>
        <span className='cross'>{squares[6]}</span>
      </div>
      <div className="square bottom" onClick={() => handleClick(7)}>
        <span className='cross'>{squares[7]}</span>
      </div>
      <div className="square bottom right" onClick={() => handleClick(8)}>
        <span className='cross'>{squares[8]}</span>
      </div>
    </div>
    <div> 
      <button className='play-again-button' onClick={playAgain}>Play Again</button>
    </div>
    </>
  );
}

export default function Game() {
  

  return (
    <div className="game">
        <Board/>
    </div>
  );
}
