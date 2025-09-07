import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface MarqueeProps {
  items: (string | React.ReactNode)[];
  className?: string;
  speed?: number; // seconds for one loop
  direction?: "left" | "right";
}

export function Marquee({ items, className, speed = 18, direction = "left" }: MarqueeProps) {
  const xFrom = direction === "left" ? "0%" : "-50%";
  const xTo = direction === "left" ? "-50%" : "0%";
  return (
    <div
      className={cn(
        "relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
        className,
      )}
    >
      <motion.div
        className="flex min-w-[200%] gap-8 whitespace-nowrap py-2"
        aria-hidden
        animate={{ x: [xFrom, xTo] }}
        transition={{ duration: speed, ease: "linear", repeat: Infinity }}
      >
        {[0, 1].map((row) => (
          <div key={row} className="flex w-1/2 shrink-0 items-center justify-around gap-8">
            {items.map((it, i) => (
              <div key={`${row}-${i}`} className="text-sm text-muted-foreground">
                {it}
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
