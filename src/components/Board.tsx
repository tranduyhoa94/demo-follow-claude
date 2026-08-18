"use client";

import { useState } from "react";
import {
  EMPTY_BOARD,
  calculateWinner,
  getNextPlayer,
  isDraw,
  makeMove,
  type BoardState,
  type Player,
} from "@/lib/game";
import WinPopup from "@/components/WinPopup";

export default function Board() {
  const [board, setBoard] = useState<BoardState>(EMPTY_BOARD);
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");

  const winner = calculateWinner(board);
  const draw = isDraw(board);
  const isGameOver = winner !== null || draw;

  function handleCellClick(index: number) {
    if (board[index] !== null || isGameOver) {
      return;
    }

    setBoard(makeMove(board, index, currentPlayer));
    setCurrentPlayer(getNextPlayer(currentPlayer));
  }

  function handleReset() {
    setBoard(EMPTY_BOARD);
    setCurrentPlayer("X");
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <p
        className={
          isGameOver
            ? "text-2xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-accent-x to-accent-o"
            : "text-xl font-medium text-foreground"
        }
      >
        {winner
          ? `${winner} đã thắng!`
          : draw
            ? "Hòa!"
            : `Lượt của: ${currentPlayer}`}
      </p>
      <button
        type="button"
        onClick={handleReset}
        className="rounded-md bg-accent-x px-4 py-2 font-medium text-white shadow-sm transition-all duration-200 hover:scale-105 hover:brightness-110"
      >
        Chơi lại
      </button>
      <div className="grid grid-cols-3 gap-2 rounded-2xl border border-white/40 bg-white/60 p-3 shadow-xl shadow-indigo-950/10 backdrop-blur-sm dark:border-white/10 dark:bg-white/5 dark:shadow-black/40">
        {board.map((cell, index) => (
          <button
            key={index}
            type="button"
            onClick={() => handleCellClick(index)}
            aria-label={`Ô ${index + 1}${cell ? `, đã đánh ${cell}` : ", trống"}`}
            className={`flex h-20 w-20 items-center justify-center rounded-md bg-white dark:bg-black/40 text-3xl font-bold transition-all duration-200 ease-out hover:scale-105 hover:bg-zinc-100 dark:hover:bg-zinc-900 ${
              cell === "X"
                ? "text-accent-x"
                : cell === "O"
                  ? "text-accent-o"
                  : "text-foreground"
            }`}
          >
            {cell}
          </button>
        ))}
      </div>
      {winner && <WinPopup winner={winner} onReplay={handleReset} />}
    </div>
  );
}
