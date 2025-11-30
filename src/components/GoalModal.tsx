import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface GoalModalProps {
  isOpen: boolean;
  goal: string;
  onClose: () => void;
  onComplete: () => void;
}

export function GoalModal({ isOpen, goal, onClose, onComplete }: GoalModalProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-strawberry-dark/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={cn(
          "relative bg-card rounded-3xl shadow-card p-8 max-w-md w-full text-center",
          "border-4 border-strawberry-light",
          isAnimating && "animate-pop-in"
        )}
      >
        {/* Decorative top */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-5xl animate-bounce-soft">
          🍓
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-gradient-strawberry mt-4 mb-2">
          Oops! You Lost!
        </h2>
        
        <p className="text-muted-foreground mb-6">
          But that's okay! Here's your self-improvement goal:
        </p>

        <div className="bg-strawberry-pink rounded-2xl p-6 mb-6">
          <p className="text-xl md:text-2xl font-semibold text-foreground leading-relaxed">
            {goal}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onComplete}
            className="flex-1 py-3 px-6 bg-primary text-primary-foreground rounded-xl font-semibold text-lg shadow-soft hover:shadow-glow transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Done! Play Again 🌟
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 px-6 bg-secondary text-secondary-foreground rounded-xl font-semibold text-lg shadow-soft hover:bg-accent transition-all duration-300"
          >
            I'll Do It Later
          </button>
        </div>

        {/* Decorative sparkles */}
        <div className="absolute top-4 right-4 text-2xl animate-sparkle">✨</div>
        <div className="absolute bottom-4 left-4 text-2xl animate-sparkle" style={{ animationDelay: "0.5s" }}>✨</div>
      </div>
    </div>
  );
}
