import { cn } from "@/lib/utils";

type Player = "X" | "O" | null;

interface GameBoardProps {
  board: Player[];
  onCellClick: (index: number) => void;
  winningLine: number[] | null;
  disabled: boolean;
}

export function GameBoard({ board, onCellClick, winningLine, disabled }: GameBoardProps) {
  return (
    <div className="grid grid-cols-3 gap-3 p-4 bg-strawberry-pink rounded-2xl">
      {board.map((cell, index) => (
        <button
          key={index}
          onClick={() => onCellClick(index)}
          disabled={disabled || cell !== null}
          className={cn(
            "w-20 h-20 md:w-24 md:h-24 rounded-xl text-4xl md:text-5xl font-bold transition-all duration-200",
            "bg-card shadow-soft hover:shadow-card",
            "flex items-center justify-center",
            cell === null && !disabled && "hover:bg-strawberry-cream hover:scale-105 cursor-pointer",
            cell !== null && "cursor-default",
            winningLine?.includes(index) && "bg-accent shadow-glow animate-bounce-soft"
          )}
        >
          {cell && (
            <span
              className={cn(
                "animate-pop-in",
                cell === "X" ? "text-primary" : "text-strawberry-dark"
              )}
            >
              {cell === "X" ? "✕" : "○"}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
