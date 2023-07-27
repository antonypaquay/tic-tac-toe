import React from "react";
import Square from "./Square";

export default function Board({ xIsNext, squares, moves, onPlay, onReset }) {

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = [...squares];
    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = <p className="font-bold">Congrats! The winner is {winner}!</p>
  } else if (moves === 9) {
    status = <p className="text-red-500">Game over. Try again!</p>
  } else {
    status = <p>Next player: {xIsNext ? "X" : "O"} </p>
  }

  return (
    <div className="w-10/12 max-w-lg flex flex-col gap-y-4">
      <div className="w-full flex gap-x-4">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="w-full flex gap-x-4">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="w-full flex gap-x-4">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
      <div className="flex flex-col items-center">
        <div className="mt-2 text-white text-center">{status}</div>
        <button
          className={`
            py-2
            px-4
            mt-4
            bg-white
            font-bold
            text-sm
            text-gray-800
            rounded-md
            transition
            hover:bg-gray-200
            ${winner || moves === 9 ? "block" : "hidden"}
          `}
          onClick={onReset}
        >
          New game
        </button>
      </div>
    </div>
  );
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
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
