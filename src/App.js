import React, { useRef, useState } from "react";
import Board from "./components/Board";

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  const historyRef = useRef(null);

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
      description = 'Go to move #' + move;
    } else {
      description = 'Restart game';
    }
    return (
      <li key={move}>
        <button
          className="
          bg-gray-800
          mb-2 py-2
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
      <div className="absolute bottom-8 right-8 h-28 overflow-y-scroll" ref={historyRef}>
        <ol className="flex flex-col-reverse items-end transition">{moves}</ol>
      </div>
    </div>
  );
}
