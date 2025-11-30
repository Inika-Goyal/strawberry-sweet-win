import { cn } from "@/lib/utils";

interface StrawberryProps {
  className?: string;
  style?: React.CSSProperties;
}

export function Strawberry({ className, style }: StrawberryProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("drop-shadow-lg", className)}
      style={style}
    >
      {/* Leaf */}
      <path
        d="M32 8C28 4 22 6 20 10C24 8 28 10 32 14C36 10 40 8 44 10C42 6 36 4 32 8Z"
        fill="hsl(var(--strawberry-dark))"
        opacity="0.8"
      />
      <path
        d="M30 6C30 6 28 2 32 2C36 2 34 6 34 6"
        stroke="hsl(var(--strawberry-dark))"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.6"
      />
      
      {/* Berry body */}
      <ellipse
        cx="32"
        cy="38"
        rx="20"
        ry="24"
        fill="hsl(var(--primary))"
      />
      
      {/* Highlight */}
      <ellipse
        cx="26"
        cy="30"
        rx="6"
        ry="8"
        fill="hsl(var(--strawberry-light))"
        opacity="0.5"
      />
      
      {/* Seeds */}
      <ellipse cx="24" cy="36" rx="1.5" ry="2" fill="hsl(var(--strawberry-cream))" />
      <ellipse cx="32" cy="32" rx="1.5" ry="2" fill="hsl(var(--strawberry-cream))" />
      <ellipse cx="40" cy="36" rx="1.5" ry="2" fill="hsl(var(--strawberry-cream))" />
      <ellipse cx="28" cy="44" rx="1.5" ry="2" fill="hsl(var(--strawberry-cream))" />
      <ellipse cx="36" cy="44" rx="1.5" ry="2" fill="hsl(var(--strawberry-cream))" />
      <ellipse cx="32" cy="52" rx="1.5" ry="2" fill="hsl(var(--strawberry-cream))" />
      <ellipse cx="24" cy="50" rx="1.5" ry="2" fill="hsl(var(--strawberry-cream))" />
      <ellipse cx="40" cy="50" rx="1.5" ry="2" fill="hsl(var(--strawberry-cream))" />
    </svg>
  );
}
