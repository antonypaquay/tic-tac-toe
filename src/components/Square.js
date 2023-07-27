import React from "react";

export default function Square({ value, onSquareClick }) {
  return (
    <button
      className={`
        aspect-square
        grow
        basis-1/3
        flex
        items-center
        justify-center
        bg-gray-800
        rounded-md
        text-5xl
        font-bold
        text-center
        sm:text-6xl
      `}
      onClick={onSquareClick}
    >
      <span
        className={`
          custom-shadow
          block 
          transition 
          ease-in-out 
          duration-300 
          ${value !== null ? "opacity-1 translate-y-0 scale-100" : "opacity-0 translate-y-1/2 scale-75"}
        `}
      >
        {value}
      </span>
    </button>
  );
}
