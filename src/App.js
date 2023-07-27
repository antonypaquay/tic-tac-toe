import React, { useRef, useState } from "react";
import Board from "./components/Board";

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function handleReset() {
    const nextHistory = [...history.slice(0, 1)];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Move #' + move;
    } else {
      description = 'Restart game';
    }
    return (
      <li key={move} className="shrink-0 mr-4">
        <button
          className="
            w-full
            bg-gray-800
            py-2
            px-4
            rounded-md
            text-xs
            text-white
            hover:bg-gray-700
          " onClick={() => jumpTo(move)}
        >{description}</button>
      </li>
    );
  });

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gray-900">
      <Board xIsNext={xIsNext} squares={currentSquares} moves={currentMove} onPlay={handlePlay} onReset={handleReset} />
      <div className="fixed left-1/2 bottom-8 -translate-x-1/2 w-10/12 max-w-lg right-8 overflow-y-hidden">
        <ol className="flex w-full">{moves}</ol>
      </div>
    </div>
  );
}
