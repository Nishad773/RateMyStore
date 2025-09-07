import { useState } from "react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  value?: number;
  onChange?: (v: number) => void;
  size?: number;
  readOnly?: boolean;
}

export default function StarRating({
  value = 0,
  onChange,
  size = 24,
  readOnly,
}: StarRatingProps) {
  const [hover, setHover] = useState<number | null>(null);
  const current = hover ?? value;
  return (
    <div
      className="flex items-center gap-1"
      role="radiogroup"
      aria-label="Rating"
    >
      {[1, 2, 3, 4, 5].map((i) => {
        const active = i <= current;
        return (
          <button
            key={i}
            type="button"
            aria-checked={i === value}
            role="radio"
            className={cn("transition-colors", readOnly && "cursor-default")}
            onMouseEnter={() => !readOnly && setHover(i)}
            onMouseLeave={() => !readOnly && setHover(null)}
            onClick={() => !readOnly && onChange?.(i)}
            style={{ width: size, height: size }}
          >
            <svg
              viewBox="0 0 24 24"
              width={size}
              height={size}
              className={active ? "text-yellow-500" : "text-muted-foreground"}
            >
              <path
                fill="currentColor"
                d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.786 1.402 8.168L12 18.896l-7.336 3.869 1.402-8.168L.132 9.211l8.2-1.193z"
              />
            </svg>
          </button>
        );
      })}
    </div>
  );
}
