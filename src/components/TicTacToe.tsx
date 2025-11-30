import { useState, useCallback } from "react";
import { GameBoard } from "./GameBoard";
import { GoalModal } from "./GoalModal";
import { Strawberry } from "./Strawberry";

type Player = "X" | "O" | null;
type Board = Player[];

const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6], // diagonals
];

const SELF_IMPROVEMENT_GOALS = [
  "Do 10 push-ups right now! 💪",
  "Drink a full glass of water 💧",
  "Write down 3 things you're grateful for ✨",
  "Take a 5-minute stretch break 🧘",
  "Send a kind message to someone you love 💕",
  "Read 10 pages of a book 📚",
  "Do 20 jumping jacks! 🏃‍♀️",
  "Clean one small area of your space 🧹",
  "Practice deep breathing for 2 minutes 🌸",
  "Write down one goal for tomorrow 📝",
  "Compliment yourself in the mirror 🪞",
  "Do a 1-minute plank! 💪",
  "Listen to an uplifting song 🎵",
  "Take a quick walk around your space 🚶‍♀️",
  "Write a positive affirmation 💗",
];

export function TicTacToe() {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [winner, setWinner] = useState<Player | "draw" | null>(null);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [currentGoal, setCurrentGoal] = useState("");
  const [winningLine, setWinningLine] = useState<number[] | null>(null);

  const checkWinner = useCallback((currentBoard: Board): Player | "draw" | null => {
    for (const combination of WINNING_COMBINATIONS) {
      const [a, b, c] = combination;
      if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
        setWinningLine(combination);
        return currentBoard[a];
      }
    }
    if (currentBoard.every((cell) => cell !== null)) {
      return "draw";
    }
    return null;
  }, []);

  const makeAIMove = useCallback((currentBoard: Board) => {
    const availableMoves = currentBoard
      .map((cell, index) => (cell === null ? index : null))
      .filter((index) => index !== null) as number[];

    if (availableMoves.length === 0) return;

    // Simple AI: try to win, block, or random
    let bestMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];

    // Try to win
    for (const move of availableMoves) {
      const testBoard = [...currentBoard];
      testBoard[move] = "O";
      if (checkWinner(testBoard) === "O") {
        bestMove = move;
        break;
      }
    }

    // Try to block
    for (const move of availableMoves) {
      const testBoard = [...currentBoard];
      testBoard[move] = "X";
      if (checkWinner(testBoard) === "X") {
        bestMove = move;
        break;
      }
    }

    setTimeout(() => {
      const newBoard = [...currentBoard];
      newBoard[bestMove] = "O";
      setBoard(newBoard);
      
      const result = checkWinner(newBoard);
      if (result) {
        setWinner(result);
        if (result === "O") {
          const randomGoal = SELF_IMPROVEMENT_GOALS[Math.floor(Math.random() * SELF_IMPROVEMENT_GOALS.length)];
          setCurrentGoal(randomGoal);
          setShowGoalModal(true);
        }
      } else {
        setIsPlayerTurn(true);
      }
    }, 500);
  }, [checkWinner]);

  const handleCellClick = (index: number) => {
    if (board[index] || winner || !isPlayerTurn) return;

    const newBoard = [...board];
    newBoard[index] = "X";
    setBoard(newBoard);
    setIsPlayerTurn(false);

    const result = checkWinner(newBoard);
    if (result) {
      setWinner(result);
    } else {
      makeAIMove(newBoard);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
    setWinner(null);
    setWinningLine(null);
    setShowGoalModal(false);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* Decorative strawberries */}
      <Strawberry className="absolute top-10 left-10 w-12 h-12 animate-float" style={{ animationDelay: "0s" }} />
      <Strawberry className="absolute top-20 right-16 w-8 h-8 animate-float" style={{ animationDelay: "0.5s" }} />
      <Strawberry className="absolute bottom-20 left-20 w-10 h-10 animate-float" style={{ animationDelay: "1s" }} />
      <Strawberry className="absolute bottom-32 right-10 w-14 h-14 animate-float" style={{ animationDelay: "1.5s" }} />
      
      {/* Main content */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gradient-strawberry mb-2">
          Strawberry Tic Tac Toe
        </h1>
        <p className="text-muted-foreground text-lg">
          Lose? Time for self-improvement! 🍓
        </p>
      </div>

      <div className="bg-card rounded-2xl shadow-card p-6 md:p-8">
        <GameBoard
          board={board}
          onCellClick={handleCellClick}
          winningLine={winningLine}
          disabled={!!winner || !isPlayerTurn}
        />

        <div className="mt-6 text-center">
          {winner === "X" && (
            <p className="text-xl font-semibold text-primary animate-bounce-soft">
              🎉 You won! Amazing!
            </p>
          )}
          {winner === "O" && (
            <p className="text-xl font-semibold text-strawberry-dark">
              Time to grow! 🌱
            </p>
          )}
          {winner === "draw" && (
            <p className="text-xl font-semibold text-muted-foreground">
              It's a tie! 🤝
            </p>
          )}
          {!winner && (
            <p className="text-lg text-muted-foreground">
              {isPlayerTurn ? "Your turn! (X)" : "AI thinking... 🤔"}
            </p>
          )}
        </div>

        {winner && (
          <button
            onClick={resetGame}
            className="mt-4 w-full py-3 px-6 bg-primary text-primary-foreground rounded-xl font-semibold text-lg shadow-soft hover:shadow-glow transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Play Again 🍓
          </button>
        )}
      </div>

      <GoalModal
        isOpen={showGoalModal}
        goal={currentGoal}
        onClose={() => {
          setShowGoalModal(false);
        }}
        onComplete={resetGame}
      />
    </div>
  );
}
